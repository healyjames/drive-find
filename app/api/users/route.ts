import { NextApiRequest, NextApiResponse } from 'next'
import client from "@/lib/mongodb"
import { LOGGER } from "@/lib/utils"

const LOG = LOGGER()

export async function GET(req: NextApiRequest, res: NextApiResponse) {
	try {
		const db = client.db("drive_find")
		const users = await db
			.collection("users")
			.find({})
			.toArray()

			return new Response(JSON.stringify(users), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			})
	} catch (e) {
		const err = e as Error
		LOG.error({
			tags: '[USERS] [GET]',
			message: 'Failed to get users.',
			path: '/api/users',
			error: err,
			body: JSON.stringify(req.body)
		})

		return new Response(JSON.stringify({ error: "Error fetching data", details: e }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		})
	}
}