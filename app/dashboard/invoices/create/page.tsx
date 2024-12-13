import { fetchCustomers } from "@/app/lib/data";
import { Breadcrumbs } from "@/app/ui/invoices/breadcrumbs";
import { CreateForm } from "@/app/ui/invoices/create-form";

const breadcrumbs = [
	{ label: "Invoices", href: "/dashboard/invoices" },
	{ label: "Create Invoice" },
];

export default async function Page() {
	const customers = await fetchCustomers();

	return (
		<main>
			<Breadcrumbs breadcrumbs={breadcrumbs} />

			<CreateForm customers={customers} />
		</main>
	);
}
