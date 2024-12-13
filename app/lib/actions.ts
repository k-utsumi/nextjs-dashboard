"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

/** @note 浮動小数点以下の値の比較差異が出るのを回避するため、基本は金額はセントに変換する */
const toCents = (amount: number) => amount * 100;

const FormSchema = z.object({
	id: z.string(),
	customerId: z.string(),
	amount: z.coerce.number(),
	status: z.enum(["pending", "paid"]),
	date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
	const { customerId, amount, status } = CreateInvoice.parse({
		customerId: formData.get("customerId"),
		amount: formData.get("amount"),
		status: formData.get("status"),
	});
	const date = new Date().toISOString().split("T")[0];

	await sql`
		INSERT INTO invoices (customer_id, amount, status, date)
		VALUES (${customerId}, ${toCents(amount)}, ${status}, ${date})
	`;

	revalidatePath("/dashboard/invoices");
	redirect("/dashboard/invoices");
}

export async function updateInvoice(id: string, formData: FormData) {
	const { customerId, amount, status } = UpdateInvoice.parse({
		customerId: formData.get("customerId"),
		amount: formData.get("amount"),
		status: formData.get("status"),
	});

	await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${toCents(amount)}, status = ${status}
        WHERE id = ${id}
    `;

	revalidatePath("/dashboard/invoices");
	redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
	await sql`DELETE FROM invoices WHERE id = ${id}`;

	revalidatePath("/dashboard/invoices");
}
