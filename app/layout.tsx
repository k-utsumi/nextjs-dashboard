import { inter } from "@/app/ui/fonts";
import "@/app/ui/global.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		template: "%s | Acme Dashboard",
		default: "Acme Dashboard",
	},
	description: "The official Next.js Course Dashboard, built with App Router.",
	metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			{/* NOTE: Safari は SVG ファビコン非対応 */}
			<link rel="icon" href="/favicon.svg" />
			<body className={`${inter.className} antialiased`}>
				{children}
				<SpeedInsights />
			</body>
		</html>
	);
}
