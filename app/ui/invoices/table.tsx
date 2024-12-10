import { fetchFilteredInvoices } from "@/app/lib/data";
import { formatCurrency, formatDateToLocal } from "@/app/lib/utils";
import { DeleteInvoice, UpdateInvoice } from "@/app/ui/invoices/buttons";
import InvoiceStatus from "@/app/ui/invoices/status";
import clsx from "clsx";
import Image from "next/image";

export default async function InvoicesTable({
	query,
	currentPage,
}: {
	query: string;
	currentPage: number;
}) {
	const invoices = await fetchFilteredInvoices(query, currentPage);

	return (
		<div className="mt-6 table min-w-full rounded-lg bg-gray-50 p-2 md:pt-0">
			<div className="md:hidden">
				{invoices?.map((invoice) => (
					<div key={invoice.id} className="mb-2 w-full rounded-md bg-white p-4">
						<div className="flex items-center justify-between border-b pb-4">
							<div>
								<div className="mb-2 flex items-center">
									<Image
										src={invoice.image_url}
										className="mr-2 rounded-full"
										width={28}
										height={28}
										alt={`${invoice.name}'s profile picture`}
									/>
									<p>{invoice.name}</p>
								</div>
								<p className="text-sm text-gray-500">{invoice.email}</p>
							</div>
							<InvoiceStatus status={invoice.status} />
						</div>
						<div className="flex w-full items-center justify-between pt-4">
							<div>
								<p className="text-xl font-medium">
									{formatCurrency(invoice.amount)}
								</p>
								<p>{formatDateToLocal(invoice.date)}</p>
							</div>
							<div className="flex justify-end gap-2">
								<UpdateInvoice id={invoice.id} />
								<DeleteInvoice id={invoice.id} />
							</div>
						</div>
					</div>
				))}
			</div>

			<table className="hidden w-full text-gray-900 text-sm md:table">
				<thead className="text-left">
					<tr>
						<th scope="col" className="px-4 py-5 font-medium xl:pl-6">
							Customer
						</th>
						<th scope="col" className="px-3 py-5 font-medium">
							Email
						</th>
						<th scope="col" className="px-3 py-5 font-medium">
							Amount
						</th>
						<th scope="col" className="px-3 py-5 font-medium">
							Date
						</th>
						<th scope="col" className="px-3 py-5 font-medium">
							Status
						</th>
						<th scope="col" className="relative py-3 pl-6 pr-3">
							<span className="sr-only">Edit</span>
						</th>
					</tr>
				</thead>
				<tbody className="bg-white whitespace-nowrap">
					{invoices?.map((invoice, i) => (
						<tr
							key={invoice.id}
							className={clsx(
								i === 0 &&
									"[&>td:first-child]:rounded-tl-lg [&>td:last-child]:rounded-tr-lg",
								i === invoices.length - 1
									? "[&>td:first-child]:rounded-bl-lg [&>td:last-child]:rounded-br-lg"
									: "border-b",
							)}
						>
							<td className="py-3 pl-4 pr-3 xl:pl-6">
								<div className="flex items-center gap-3">
									<Image
										src={invoice.image_url}
										// NOTE: min width が無いと pr が効かない
										className="rounded-full min-w-7"
										width={28}
										height={28}
										alt={`${invoice.name}'s profile picture`}
									/>
									<p>{invoice.name}</p>
								</div>
							</td>
							<td className="py-3 px-3">{invoice.email}</td>
							<td className="py-3 px-3">{formatCurrency(invoice.amount)}</td>
							<td className="py-3 px-3">{formatDateToLocal(invoice.date)}</td>
							<td className="py-3 px-3">
								<InvoiceStatus status={invoice.status} />
							</td>
							<td className="py-3 pl-6 pr-4">
								<div className="flex justify-end gap-3">
									<UpdateInvoice id={invoice.id} />
									<DeleteInvoice id={invoice.id} />
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
