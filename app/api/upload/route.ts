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

			return res.status(200).json(movies)
	} catch (e) {
		console.error(e)
		return res.status(500).json({ "Error fetching data: ": e })
	}
}