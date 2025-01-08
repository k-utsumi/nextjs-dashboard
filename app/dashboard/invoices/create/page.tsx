import { type InvoiceState, createInvoice } from "@/app/lib/actions";
import { fetchCustomers } from "@/app/lib/data";
import { Breadcrumbs } from "@/app/ui/invoices/breadcrumbs";
import { InvoiceForm } from "@/app/ui/invoices/invoice-form";

const breadcrumbs = [
	{ label: "Invoices", href: "/dashboard/invoices" },
	{ label: "Create Invoice" },
];

const formData = new FormData();
// NOTE: customerId (select 要素) は指定が無いと disabled の先頭要素が選択されない
formData.append("customerId", "");
const initialState: InvoiceState = { formData };

export default async function Page() {
	const customers = await fetchCustomers();

	return (
		<main>
			<Breadcrumbs breadcrumbs={breadcrumbs} />

			<InvoiceForm
				type="create"
				customers={customers}
				action={createInvoice}
				initialState={initialState}
			/>
		</main>
	);
}
