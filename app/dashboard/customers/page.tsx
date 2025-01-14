import { fetchCustomersWithImage } from "@/app/lib/data";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";

export default async function Page() {
	const customers = await fetchCustomersWithImage();

	return (
		<>
			<h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
				Customers
			</h1>

			<div className="rounded-xl bg-gray-50 p-4">
				<ul className="grid gap-1 bg-white px-3 divide-y">
					{customers.map((customer) => (
						<li
							key={customer.name}
							className="flex items-center gap-4 px-1 py-2 text-sm"
						>
							<Image
								src={customer.image_url}
								className="rounded-full"
								width={28}
								height={28}
								alt={`${customer.name}'s profile picture`}
							/>
							<span>
								<strong className="md:text-base">{customer.name}</strong>
								<br />
								{customer.email}
							</span>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}
