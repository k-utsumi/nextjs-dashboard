import { inter } from "@/app/ui/fonts";
import "@/app/ui/global.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
	title: {
		template: "%s | Acme Dashboard",
		default: "Acme Dashboard",
	},
	description: "The official Next.js Course Dashboard, built with App Router.",
	metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const headersList = await headers();
	const showFavicon = headersList && false;

	return (
		<html lang="en">
			{showFavicon && (
				// NOTE: Safari は SVG ファビコン非対応
				<link rel="icon" href="/favicon.svg" />
			)}

			<body className={`${inter.className} antialiased`}>
				{children}
				<SpeedInsights />
			</body>
		</html>
	);
}
