import Link from "next/link";

export default function Page() {
	return (
		<>
			<h1>Dashboard</h1>

			<ul>
				<li>
					<Link className="text-blue-500" href="/dashboard/customers">
						Customers
					</Link>
				</li>
				<li>
					<Link className="text-blue-500" href="/dashboard/invoices">
						Invoices
					</Link>
				</li>
			</ul>
		</>
	);
}
