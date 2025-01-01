import { Document } from "mongodb"
import client from "@/lib/mongodb"

export async function POST(request: Request) {
  const res: Document = await request.json()

  try {
		await client.db("drive_find")
			.collection("users")
			.insertOne(res)

			return new Response(JSON.stringify({
				message: "New User Added Successfully.",
				detials: res
			}), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			})
	} catch (e) {
		console.error(e)
		return new Response(JSON.stringify({ error: "Error adding new user.", details: e }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		})
	}
}