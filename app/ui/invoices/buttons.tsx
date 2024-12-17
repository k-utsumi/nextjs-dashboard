"use client";

import { deleteInvoice } from "@/app/lib/actions";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { useActionState } from "react";

export function CreateInvoice() {
	return (
		<Link
			href="/dashboard/invoices/create"
			className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
		>
			<span className="hidden md:block">Create Invoice</span>{" "}
			<PlusIcon className="h-5 md:ml-4" />
		</Link>
	);
}

export function UpdateInvoice({ id }: { id: string }) {
	return (
		<Link
			href={`/dashboard/invoices/${id}/edit`}
			className="rounded-md border p-2 hover:bg-gray-100"
		>
			<PencilIcon className="w-5" />
		</Link>
	);
}

export function DeleteInvoice({ id }: { id: string }) {
	const action = deleteInvoice.bind(null, id);
	const [_state, formAction, isPending] = useActionState(action, null);

	const label = !isPending ? "Delete" : "Deleting...";
	const Icon = !isPending ? TrashIcon : LoadingIcon;

	return (
		<form action={formAction}>
			<button
				className="rounded-md border p-2 hover:bg-gray-100"
				aria-label={label}
			>
				<Icon className="w-5" aria-hidden="true" />
			</button>
		</form>
	);
}

/** ref: https://github.com/tailwindlabs/heroicons/issues/131#issuecomment-829192663 */
function LoadingIcon({ className }: { className: string }) {
	return (
		<svg
			className={clsx("animate-spin", className)}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			role="presentation"
		>
			<circle
				className="opacity-25"
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeWidth="4"
			/>
			<path
				className="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			/>
		</svg>
	);
}
