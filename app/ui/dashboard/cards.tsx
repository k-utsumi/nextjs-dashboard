import { fetchDashboardCards } from "@/app/lib/data";
import { lusitana } from "@/app/ui/fonts";
import {
	BanknotesIcon,
	ClockIcon,
	InboxIcon,
	UserGroupIcon,
} from "@heroicons/react/24/outline";
import { Suspense } from "react";
import { CardSkeleton } from "../skeletons";

const iconMap = {
	collected: BanknotesIcon,
	customers: UserGroupIcon,
	pending: ClockIcon,
	invoices: InboxIcon,
};

export default async function DashboardCards() {
	const {
		numberOfCustomers,
		numberOfInvoices,
		totalPaidInvoices,
		totalPendingInvoices,
	} = await fetchDashboardCards();

	return (
		<>
			<Suspense fallback={<CardSkeleton valueLength={9} />}>
				<Card title="Collected" value={totalPaidInvoices} type="collected" />
			</Suspense>
			<Suspense fallback={<CardSkeleton valueLength={9} />}>
				<Card title="Pending" value={totalPendingInvoices} type="pending" />
			</Suspense>
			<Suspense fallback={<CardSkeleton />}>
				<Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
			</Suspense>
			<Suspense fallback={<CardSkeleton />}>
				<Card
					title="Total Customers"
					value={numberOfCustomers}
					type="customers"
				/>
			</Suspense>
		</>
	);
}

interface CardProps {
	title: string;
	value: number | string;
	type: "invoices" | "customers" | "pending" | "collected";
}
export function Card({ title, value, type }: CardProps) {
	const Icon = iconMap[type];

	return (
		<div className="flex flex-col rounded-xl bg-gray-50 p-2 shadow-sm">
			<header className="flex gap-2 p-4">
				{Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
				<h3 className="text-sm font-medium">{title}</h3>
			</header>

			<p
				className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl mt-auto`}
			>
				{value}
			</p>
		</div>
	);
}
