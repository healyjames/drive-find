import { NextApiRequest, NextApiResponse } from 'next'
import { auth } from "@/auth"
import client from "@/lib/mongodb"
import { LOGGER } from "@/lib/utils"

const LOG = LOGGER()

export async function GET(req: NextApiRequest, res: NextApiResponse) {
	const session = await auth()

	if (!session) {
		return new Response(JSON.stringify({ error: "Error fetching data", details: "You must be signed in to access the content on this page." }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		})
	}

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