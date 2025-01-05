import { NextApiRequest, NextApiResponse } from 'next'
import { auth } from "@/auth"
import dbConnect from "@/lib/mongodb"
import User from '@/models/User'
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

	await dbConnect()

	try {
		const users = await User.find({})

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