"use client";

import {
	DocumentDuplicateIcon,
	HomeIcon,
	UserGroupIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
	{
		name: "Home",
		href: "/dashboard",
		icon: HomeIcon,
	},
	{
		name: "Invoices",
		href: "/dashboard/invoices",
		icon: DocumentDuplicateIcon,
	},
	{
		name: "Customers",
		href: "/dashboard/customers",
		icon: UserGroupIcon,
	},
];

const buttonClass = {
	base: "flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-3 md:flex-none md:justify-start md:p-2 md:px-3",
	color: {
		base: "bg-gray-50 hover:bg-sky-100 hover:text-blue-600",
		active: "bg-sky-100 text-blue-600",
	},
	compose(isActive: boolean) {
		return clsx(this.base, this.color[isActive ? "active" : "base"]);
	},
};

const NavLink: React.FC<{
	isActive: boolean;
	href: string;
	children: React.ReactNode;
}> = ({ isActive, href, children, ..._props }) => {
	const props = { ..._props, className: buttonClass.compose(isActive) };

	return isActive ? (
		<a {...props}>{children}</a>
	) : (
		<Link {...props} href={href}>
			{children}
		</Link>
	);
};

export default function NavLinks() {
	const pathname = usePathname();

	return (
		<ul className="grow flex md:flex-col md:grow-0 gap-2 text-sm font-medium">
			{links.map((item) => (
				<li key={item.name} className="grow">
					<NavLink isActive={pathname === item.href} href={item.href}>
						<item.icon className="w-6" />
						<p className="hidden md:block">{item.name}</p>
					</NavLink>
				</li>
			))}
		</ul>
	);
}
