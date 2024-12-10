"use client";

import { generatePagination } from "@/app/lib/utils";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages }: { totalPages: number }) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const currentPage = Number(searchParams.get("page")) || 1;
	const allPages = generatePagination(currentPage, totalPages);

	return (
		<div className="inline-flex">
			<PaginationArrow
				state="previous"
				href={pageURL(currentPage - 1)}
				isDisabled={currentPage <= 1}
			/>

			<div className="flex -space-x-px">
				{allPages.map((page, index) => {
					let position: "first" | "last" | "single" | "middle" | undefined;

					if (index === 0) position = "first";
					if (index === allPages.length - 1) position = "last";
					if (allPages.length === 1) position = "single";
					if (page === "...") position = "middle";

					return (
						<PaginationNumber
							key={page}
							href={pageURL(page)}
							page={page}
							position={position}
							isActive={currentPage === page}
						/>
					);
				})}
			</div>

			<PaginationArrow
				state="next"
				href={pageURL(currentPage + 1)}
				isDisabled={currentPage >= totalPages}
			/>
		</div>
	);

	function pageURL(page: number | string) {
		const params = new URLSearchParams(searchParams);

		page !== 1 ? params.set("page", page.toString()) : params.delete("page");

		return `${pathname}?${params.toString()}`;
	}
}

function PaginationNumber({
	page,
	href,
	isActive,
	position,
}: {
	page: number | string;
	href: string;
	position?: "first" | "last" | "middle" | "single";
	isActive: boolean;
}) {
	const className = clsx(
		"flex h-10 w-10 items-center justify-center text-sm border",
		{
			"rounded-l-md": position === "first" || position === "single",
			"rounded-r-md": position === "last" || position === "single",
			"z-10 bg-blue-600 border-blue-600 text-white": isActive,
			"hover:bg-gray-100": !isActive && position !== "middle",
			"text-gray-300": position === "middle",
		},
	);

	return isActive || position === "middle" ? (
		<div className={className}>{page}</div>
	) : (
		<Link href={href} className={className}>
			{page}
		</Link>
	);
}

const paginationArrowLabel = {
	previous: "Previous page",
	next: "Next page",
};
// biome-ignore format: 整形用
const paginationArrowIcon = {
	previous: <ArrowLeftIcon  className="w-4" aria-hidden />,
	next:     <ArrowRightIcon className="w-4" aria-hidden />,
};
function PaginationArrow({
	href,
	state,
	isDisabled,
}: {
	href: string;
	state: "previous" | "next";
	isDisabled?: boolean;
}) {
	const className = clsx(
		"flex h-10 w-10 items-center justify-center rounded-md border",
		{
			"pointer-events-none text-gray-300": isDisabled,
			"hover:bg-gray-100": !isDisabled,
			"mr-2 md:mr-4": state === "previous",
			"ml-2 md:ml-4": state === "next",
		},
	);

	return isDisabled ? (
		<div className={className}>{paginationArrowIcon[state]}</div>
	) : (
		<Link
			className={className}
			href={href}
			aria-label={paginationArrowLabel[state]}
		>
			{paginationArrowIcon[state]}
		</Link>
	);
}
