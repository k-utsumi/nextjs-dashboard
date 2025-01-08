"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

/** @note 浮動小数点以下の値の比較差異が出るのを回避するため、基本は金額はセントに変換する */
const toCents = (amount: number) => amount * 100;

const INVOICE_STATUSES = ["pending", "paid"] as const;
const Invoice = z.object({
	id: z.string(),
	customerId: z.string({
		invalid_type_error: "Please select a customer.",
	}),
	amount: z.coerce.number().gt(0, {
		message: "Please enter an amount greater than $0.",
	}),
	status: z.enum(INVOICE_STATUSES, {
		invalid_type_error: "Please select an invoice status.",
	}),
	date: z.string(),
});

const CreateInvoice = Invoice.omit({ id: true, date: true });
const UpdateInvoice = Invoice.omit({ id: true, date: true });

type InvoiceFieldKey = "customerId" | "amount" | "status";
interface InvoiceErrorState {
	/** エラー時の入力値保持 */
	formData?: FormData;
	message?: string;
	fieldErrors?: Partial<Record<InvoiceFieldKey, string[]>>;
}
export type InvoiceState = InvoiceErrorState | undefined;

export async function createInvoice(
	_prevState: InvoiceState,
	formData: FormData,
): Promise<InvoiceState> {
	// Validate form using Zod
	const validatedFields = CreateInvoice.safeParse({
		customerId: formData.get("customerId"),
		amount: formData.get("amount"),
		status: formData.get("status"),
	});

	// If form validation fails, return errors early. Otherwise, continue.
	if (!validatedFields.success) {
		const message = "Missing Fields. Failed to Create Invoice.";
		const { fieldErrors } = validatedFields.error.flatten();

		return { formData, message, fieldErrors };
	}

	// Prepare data for insertion into the database
	const { customerId, amount, status } = validatedFields.data;
	const date = new Date().toISOString().split("T")[0];

	// Insert data into the database
	try {
		await sql`
			INSERT INTO invoices (customer_id, amount, status, date)
			VALUES (${customerId}, ${toCents(amount)}, ${status}, ${date})
		`;
	} catch (_error) {
		const message = "Database Error: Failed to Create Invoice.";

		// If a database error occurs, return a more specific error.
		return { formData, message };
	}

	// Revalidate the cache for the invoices page and redirect the user.
	revalidateNext({ target: "invoices", isRedirect: true });
}

export async function updateInvoice(
	id: string,
	_prevState: InvoiceState,
	formData: FormData,
): Promise<InvoiceState> {
	const validatedFields = UpdateInvoice.safeParse({
		customerId: formData.get("customerId"),
		amount: formData.get("amount"),
		status: formData.get("status"),
	});

	if (!validatedFields.success) {
		const message = "Missing Fields. Failed to Update Invoice.";
		const { fieldErrors } = validatedFields.error.flatten();

		return { formData, message, fieldErrors };
	}

	const { customerId, amount, status } = validatedFields.data;

	try {
		await sql`
			UPDATE invoices
			SET customer_id = ${customerId}, amount = ${toCents(amount)}, status = ${status}
			WHERE id = ${id}
		`;
	} catch (_error) {
		const message = "Database Error: Failed to Update Invoice.";

		return { formData, message };
	}

	revalidateNext({ target: "invoices", isRedirect: true });
}

export async function deleteInvoice(id: string) {
	try {
		await sql`DELETE FROM invoices WHERE id = ${id}`;
	} catch (_error) {
		return { message: "Database Error: Failed to Delete Invoice." };
	}

	revalidateNext({ target: "invoices" });
	return { message: "Deleted Invoice." };
}

const revalidateNextTo = { invoices: "/dashboard/invoices" } as const;
interface RevalidateNextOptions {
	target: keyof typeof revalidateNextTo;
	/** revalidate の後にリダイレクト */
	isRedirect?: boolean;
}
function revalidateNext({ target, isRedirect }: RevalidateNextOptions) {
	revalidatePath(revalidateNextTo[target]);
	isRedirect && redirect(revalidateNextTo[target]);
}
