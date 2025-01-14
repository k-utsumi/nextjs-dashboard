import { type InvoiceState, updateInvoice } from "@/app/lib/actions";
import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data";
import { Breadcrumbs } from "@/app/ui/invoices/breadcrumbs";
import { InvoiceForm } from "@/app/ui/invoices/invoice-form";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const title = "Edit Invoice";
export const metadata: Metadata = { title };

const breadcrumbs = [
	{ label: "Invoices", href: "/dashboard/invoices" },
	{ label: title },
];

interface RouteParams {
	id: string;
}
interface PageProps {
	params: Promise<RouteParams>;
}

export default async function Page({ params }: PageProps) {
	const { id } = await params;
	const [invoice, customers] = await Promise.all([
		fetchInvoiceById(id),
		fetchCustomers(),
	]);

	if (!invoice) notFound();

	const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);

	const formData = new FormData();
	formData.append("customerId", invoice.customer_id);
	formData.append("amount", String(invoice.amount));
	formData.append("status", invoice.status);
	const initialState: InvoiceState = { formData };

	return (
		<main>
			<Breadcrumbs breadcrumbs={breadcrumbs} />

			<InvoiceForm
				type="edit"
				customers={customers}
				action={updateInvoiceWithId}
				initialState={initialState}
			/>
		</main>
	);
}
