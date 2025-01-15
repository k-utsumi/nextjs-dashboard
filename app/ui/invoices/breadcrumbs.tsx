import { lusitana } from "@/app/ui/fonts";
import { clsx } from "clsx";
import Link from "next/link";

interface Breadcrumb {
	label: string;
	/** @note 指定がない場合は current 扱い */
	href?: string;
}
interface Props {
	breadcrumbs: Breadcrumb[];
}

export const Breadcrumbs = ({ breadcrumbs }: Props) => (
	<nav aria-label="Breadcrumb" className="mb-6 text-xl md:text-2xl">
		<ol className={clsx(lusitana.className, "flex")}>
			{breadcrumbs.map(({ label, href }, i) => {
				const isCurrent = !href;
				const colorClass = isCurrent ? "text-gray-900" : "text-gray-500";
				const separatorClass = "before:content-['/'] before:mx-3";

				return (
					<li
						key={label}
						className={clsx(i > 0 && separatorClass, colorClass)}
						aria-current={isCurrent}
					>
						{href ? <Link href={href}>{label}</Link> : label}
					</li>
				);
			})}
		</ol>
	</nav>
);
