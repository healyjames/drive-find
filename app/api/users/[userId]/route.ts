import client from "@/lib/mongodb"
import { LOGGER } from "@/lib/utils"

const LOG = LOGGER()

export async function GET(
	request: Request, { params }: { params: Promise<{ userId: string }> }
) {
	const userId = (await params).userId

	try {
		const db = client.db("drive_find")
		const user = await db
			.collection("users")
			.find({userId: userId})
			.toArray()

			if(user.length === 0 || !user) {
				throw Error(`No results found for ${userId}`)
			}

			return new Response(JSON.stringify(user), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			})
	} catch (e) {
		const err = e as Error
		LOG.error({
			tags: '[USER] [GET]',
			message: err.message,
			path: '/api/users',
			error: err
		})

		return new Response(JSON.stringify({ error: "Error fetching data", details: err.message }), {
			// status: err.message.startsWith('No results') ? 204 : 500, // Bug means 204 fails: https://github.com/vercel/next.js/pull/48354. TODO: update nextjs version
			status: 500,
			headers: { "Content-Type": "application/json" },
		})
	}
}