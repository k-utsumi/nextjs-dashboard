"use client";

import { lusitana } from "@/app/ui/fonts";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import {
	AtSymbolIcon,
	ExclamationCircleIcon,
	KeyIcon,
} from "@heroicons/react/24/outline";
import { useActionState } from "react";
import { authenticate } from "../lib/actions";
import { Button } from "./button";

export default function LoginForm() {
	const [state, formAction, isPending] = useActionState(
		authenticate,
		undefined,
	);

	return (
		<form action={formAction} className="space-y-3">
			<div className="flex-1 rounded-lg bg-gray-50 px-6 pt-8 pb-11">
				<h1 className={`${lusitana.className} mb-3 text-2xl`}>
					Please log in to continue.
				</h1>
				<div className="w-full">
					<div>
						<label
							className="mb-3 mt-5 block text-xs font-medium text-gray-900"
							htmlFor="email"
						>
							Email
						</label>
						<div className="relative">
							<input
								className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
								id="email"
								type="email"
								name="email"
								placeholder="Enter your email address"
								defaultValue={state?.formData?.get("email") as string}
								required
							/>
							<AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>
					<div className="mt-4">
						<label
							className="mb-3 mt-5 block text-xs font-medium text-gray-900"
							htmlFor="password"
						>
							Password
						</label>
						<div className="relative">
							<input
								className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
								id="password"
								type="password"
								name="password"
								placeholder="Enter password"
								required
								minLength={6}
							/>
							<KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>
				</div>
				<Button className="mt-4 w-full" disabled={isPending}>
					Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
				</Button>
				{state && (
					<p className="flex items-center gap-1 text-red-500 text-sm  mt-3 -mb-8">
						<ExclamationCircleIcon className="h-5 w-5" />
						<span className="flex-1">{state.message}</span>
					</p>
				)}
			</div>
		</form>
	);
}
