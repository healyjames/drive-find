import { Document } from "mongodb"
import client from "@/lib/mongodb"
import { LOGGER } from "@/lib/utils"

const LOG = LOGGER()

export async function POST(request: Request) {
  const req: Document = await request.json()

  try {
		await client.db("drive_find")
			.collection("users")
			.insertOne(req)

			LOG.success({
				tags: '[USER] [INSERT]',
				message: `Successfully added ${req.name} (${req.email}) | userID: ${req.userId}`,
			})
			
			return new Response(JSON.stringify({
				message: "New User Added Successfully.",
				detials: req
			}), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			})
	} catch (e) {
		LOG.error({
			tags: '[USER] [INSERT]',
			message: 'Failed to add new user.',
			path: '/api/users/insert',
			error: e as string
		})
		
		return new Response(JSON.stringify({ error: "Error adding new user.", details: e }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		})
	}
}