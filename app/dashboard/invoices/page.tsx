import { fetchInvoiceTotalPages } from "@/app/lib/data";
import { lusitana } from "@/app/ui/fonts";
import { CreateInvoice } from "@/app/ui/invoices/buttons";
import Pagination from "@/app/ui/invoices/pagination";
import InvoicesTable from "@/app/ui/invoices/table";
import Search from "@/app/ui/search";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

interface SearchParams {
	query?: string;
	page?: string;
}
interface PageProps {
	searchParams?: Promise<SearchParams>;
}

export default async function Page(props: PageProps) {
	const searchParams = await props.searchParams;
	const query = searchParams?.query || "";
	const currentPage = Number(searchParams?.page) || 1;
	const totalPages = await fetchInvoiceTotalPages(query);

	return (
		<div className="w-full">
			<div className="flex w-full items-center justify-between">
				<h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
			</div>
			<div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
				<Search placeholder="Search invoices..." />
				<CreateInvoice />
			</div>
			{/* HACK: Chrome では relative が無いと body？が横スクロールできてしまう */}
			<div className="px-6 md:px-12 -mx-6 md:-mx-12 overflow-auto relative">
				<Suspense
					key={query + currentPage}
					fallback={<InvoicesTableSkeleton />}
				>
					<InvoicesTable query={query} currentPage={currentPage} />
				</Suspense>
			</div>
			<div className="mt-5 flex w-full justify-center">
				<Pagination totalPages={totalPages} />
			</div>
		</div>
	);
}
