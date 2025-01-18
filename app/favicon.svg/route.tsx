import React from "react";
import { SiNextdotjs } from "react-icons/si";
import {
	// isDeployedBranch,
	isLocalhost,
} from "../lib/utils";

const color = {
	localhost: "green",
	deployedBranch: "goldenrod",
} as const;
const environmentColor = (url: string) => {
	// if (isDeployedBranch(url)) return color.deployedBranch;
	if (isLocalhost(url)) return color.localhost;
};

const Icon = SiNextdotjs;

export async function GET(request: Request) {
	const color = environmentColor(request.url);
	const iconProps = { color };

	const ReactDOMServer = await import("react-dom/server");
	const body = ReactDOMServer.renderToString(<Icon {...iconProps} />);

	const init = { headers: { "Content-Type": "image/svg+xml" } };

	return new Response(body, init);
}
