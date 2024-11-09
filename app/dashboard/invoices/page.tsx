import Link from "next/link";

export default function Page() {
	return (
		<>
			<h1>Invoices</h1>

			<p>
				<Link className="text-blue-500" href="/dashboard">
					Dashboard
				</Link>
			</p>
		</>
	);
}
