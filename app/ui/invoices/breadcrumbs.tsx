import { lusitana } from "@/app/ui/fonts";
import { clsx } from "clsx";
import Link from "next/link";

interface Breadcrumb {
	label: string;
	href: string;
	active?: boolean;
}
interface Props {
	breadcrumbs: Breadcrumb[];
}

export const Breadcrumbs = ({ breadcrumbs }: Props) => (
	<nav aria-label="Breadcrumb" className="mb-6">
		<ol className={clsx(lusitana.className, "flex text-xl md:text-2xl")}>
			{breadcrumbs.map(({ label, href, active }, i) => (
				<li
					key={href}
					aria-current={active}
					className={clsx(active ? "text-gray-900" : "text-gray-500")}
				>
					<Link href={href}>{label}</Link>
					{i < breadcrumbs.length - 1 ? (
						<span className="mx-3 inline-block">/</span>
					) : null}
				</li>
			))}
		</ol>
	</nav>
);
