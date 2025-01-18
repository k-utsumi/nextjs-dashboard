import React from "react";
import { SiNextdotjs } from "react-icons/si";

const Icon = SiNextdotjs;

export async function GET(request: Request) {
	const isLocal = /localhost/.test(request.url);

	const color = isLocal ? "green" : "goldenrod";
	const iconProps = { color };

	const ReactDOMServer = await import("react-dom/server");
	const body = ReactDOMServer.renderToString(<Icon {...iconProps} />);

	const init = { headers: { "Content-Type": "image/svg+xml" } };

	return new Response(body, init);
}
