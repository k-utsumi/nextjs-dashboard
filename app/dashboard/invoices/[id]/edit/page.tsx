import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data";
import { Breadcrumbs } from "@/app/ui/invoices/breadcrumbs";
import { EditForm } from "@/app/ui/invoices/edit-form";

const breadcrumbs = [
	{ label: "Invoices", href: "/dashboard/invoices" },
	{ label: "Edit Invoice" },
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

	return (
		<main>
			<Breadcrumbs breadcrumbs={breadcrumbs} />

			<EditForm invoice={invoice} customers={customers} />
		</main>
	);
}
