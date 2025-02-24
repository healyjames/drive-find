import { NextApiRequest, NextApiResponse } from 'next'
import { auth } from "@/auth"
import dbConnect from "@/lib/mongodb"
import Post from '@/models/Post'
import { LOGGER } from "@/lib/utils"

const LOG = LOGGER()

export async function GET(req: NextApiRequest, res: NextApiResponse) {
	await dbConnect()

	try {
		const posts = await Post.find({})

			return new Response(JSON.stringify(posts), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			})
	} catch (e) {
		const err = e as Error
		LOG.error({
			tags: '[POSTS] [GET]',
			message: 'Failed to get posts.',
			path: '/api/posts',
			error: err,
			body: JSON.stringify(req.body)
		})

		return new Response(JSON.stringify({ error: "Error fetching data", details: e }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		})
	}
}