// ref: https://github.com/vercel/next-learn/blob/5d658298e9b9e5b896e65bce2bbea81e847f188c/dashboard/starter-example/app/query/route.ts
import { db } from "@vercel/postgres";

const client = await db.connect();

async function listInvoices() {
	// NOTE: 文字列はシングルクォートで囲う
	const data = await client.sql`
		SELECT customers.name, invoices.amount
		FROM invoices
		JOIN customers ON invoices.customer_id = customers.id
		WHERE invoices.status = 'paid';
	`;

	return data.rows;
}

export async function GET() {
	try {
		return Response.json(await listInvoices());
	} catch (error) {
		return Response.json({ error }, { status: 500 });
	}
}
