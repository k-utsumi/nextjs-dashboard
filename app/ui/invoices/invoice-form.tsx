"use client";

import type { InvoiceAction, InvoiceState } from "@/app/lib/actions";
import type { CustomerField } from "@/app/lib/definitions";
import { Button } from "@/app/ui/button";
import {
	CheckIcon,
	ClockIcon,
	CurrencyDollarIcon,
	UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { startTransition, useActionState, useRef } from "react";

type InvoiceFormType = "create" | "edit";
const SUBMIT_BUTTON_LABEL: Record<InvoiceFormType, string> = {
	create: "Create Invoice",
	edit: "Edit Invoice",
};

interface Props {
	customers: CustomerField[];
	action: InvoiceAction;
	initialState: InvoiceState;
	type: InvoiceFormType;
}

export const InvoiceForm = ({
	customers,
	action,
	initialState,
	type,
}: Props) => {
	const [state, formAction, isPending] = useActionState(action, initialState);

	const formRef = useRef(null);
	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		const form = formRef.current;
		// NOTE: 直接 formAction を実行するとエラーが出ます
		form && startTransition(() => formAction(new FormData(form)));
	};

	const onAmountInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		const isValid = Number(event.currentTarget.value) > 0;
		event.currentTarget.setCustomValidity(
			isValid ? "" : "Please enter an amount greater than $0.",
		);
	};

	return (
		<form onSubmit={handleSubmit} ref={formRef}>
			<div className="max-md:rounded-md bg-gray-50 p-4 md:p-6">
				{state?.message && (
					<p className="mb-4">
						<strong className="text-red-500">{state.message}</strong>
					</p>
				)}

				{/* Customer Name */}
				<div className="mb-4">
					<label htmlFor="customer" className="mb-2 block text-sm font-medium">
						Choose customer
					</label>
					<div className="relative">
						<select
							id="customer"
							name="customerId"
							className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
							defaultValue={`${state?.formData?.get("customerId")}`}
							aria-describedby="customer-error"
							required
						>
							<option value="" disabled>
								Select a customer
							</option>
							{customers.map((customer) => (
								<option key={customer.id} value={customer.id}>
									{customer.name}
								</option>
							))}
						</select>
						<UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
					</div>
					<div id="customer-error" aria-live="polite" aria-atomic="true">
						{state?.fieldErrors?.customerId?.map((error: string) => (
							<p className="mt-2 text-sm text-red-500" key={error}>
								{error}
							</p>
						))}
					</div>
				</div>

				{/* Invoice Amount */}
				<div className="mb-4">
					<label htmlFor="amount" className="mb-2 block text-sm font-medium">
						Choose an amount
					</label>
					<div className="relative mt-2 rounded-md">
						<div className="relative">
							<input
								id="amount"
								name="amount"
								type="number"
								step="0.01"
								placeholder="Enter USD amount"
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
								defaultValue={`${state?.formData?.get("amount")}`}
								aria-describedby="amount-error"
								required
								onInput={onAmountInput}
							/>
							<CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>
					<div id="amount-error" aria-live="polite" aria-atomic="true">
						{state?.fieldErrors?.amount?.map((error: string) => (
							<p className="mt-2 text-sm text-red-500" key={error}>
								{error}
							</p>
						))}
					</div>
				</div>

				{/* Invoice Status */}
				<fieldset>
					<legend className="mb-2 block text-sm font-medium">
						Set the invoice status
					</legend>
					<div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
						<div className="flex gap-4">
							<div className="flex gap-2 items-center">
								<input
									id="pending"
									name="status"
									type="radio"
									value="pending"
									className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
									defaultChecked={state?.formData?.get("status") === "pending"}
									aria-describedby="status-error"
									required
								/>
								<label
									htmlFor="pending"
									className="flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
								>
									Pending <ClockIcon className="h-4 w-4" />
								</label>
							</div>
							<div className="flex gap-2 items-center">
								<input
									id="paid"
									name="status"
									type="radio"
									value="paid"
									className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
									defaultChecked={state?.formData?.get("status") === "paid"}
									aria-describedby="status-error"
									required
								/>
								<label
									htmlFor="paid"
									className="flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
								>
									Paid <CheckIcon className="h-4 w-4" />
								</label>
							</div>
						</div>
					</div>
					<div id="status-error" aria-live="polite" aria-atomic="true">
						{state?.fieldErrors?.status?.map((error: string) => (
							<p className="mt-2 text-sm text-red-500" key={error}>
								{error}
							</p>
						))}
					</div>
				</fieldset>
			</div>
			<div className="mt-6 flex justify-end gap-4">
				<Link
					href="/dashboard/invoices"
					className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
				>
					Cancel
				</Link>
				<Button type="submit" disabled={isPending && true}>
					{SUBMIT_BUTTON_LABEL[type]}
				</Button>
			</div>
		</form>
	);
};
