import client from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
	try {
		const db = client.db("sample_mflix") // update once new db configured
		const movies = await db
			.collection("movies")
			.find({})
			.sort({ metacritic: -1 })
			.limit(10)
			.toArray()

			return new Response(JSON.stringify(movies), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			})
	} catch (e) {
		console.error(e)
		return new Response(JSON.stringify({ error: "Error fetching data", details: e }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		})
	}
}