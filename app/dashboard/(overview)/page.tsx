import DashboardCards from "@/app/ui/dashboard/cards";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import { lusitana } from "@/app/ui/fonts";
import {
	DashboardCardsSkeleton,
	LatestInvoicesSkeleton,
	RevenueChartSkeleton,
} from "@/app/ui/skeletons";
import { Suspense } from "react";

export default async function Page() {
	return (
		<main>
			<h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
				Dashboard
			</h1>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				<Suspense fallback={<DashboardCardsSkeleton />}>
					<DashboardCards />
				</Suspense>
			</div>
			<div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
				<div className="flex flex-col md:col-span-4">
					<h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
						Recent Revenue
					</h2>
					<Suspense fallback={<RevenueChartSkeleton />}>
						<RevenueChart />
					</Suspense>
				</div>

				<div className="flex flex-col md:col-span-4">
					<h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
						Latest Invoices
					</h2>
					<Suspense fallback={<LatestInvoicesSkeleton />}>
						<LatestInvoices />
					</Suspense>
				</div>
			</div>
		</main>
	);
}
