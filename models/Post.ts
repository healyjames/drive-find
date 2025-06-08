import { Schema, Document, models, model } from 'mongoose';

interface ILocation {
  latitude: number
  longitude: number
  placeName: string
}

export interface IPost extends Document {
  userId: number
  title: string
  media_urls: string[]
  description: string
  date_created: Date
  date_modified?: Date | null
  no_likes: number
  no_comments: number
  no_shares: number
  visibility: 'public' | 'private' | 'friends'
  tags: string[]
  location: ILocation
}

const LocationSchema = new Schema<ILocation>({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  placeName: { type: String, required: true }
})

const PostSchema = new Schema<IPost>({
  userId: { type: Number, required: true },
  title: { type: String, required: true },
  media_urls: { type: [String], required: true },
  description: { type: String, required: true },
  date_created: { type: Date, required: true, default: Date.now },
  date_modified: { type: Date, default: null },
  no_likes: { type: Number, default: 0 },
  no_comments: { type: Number, default: 0 },
  no_shares: { type: Number, default: 0 },
  visibility: { type: String, enum: ['public', 'private', 'friends'], required: true },
  tags: { type: [String], default: [] },
  location: { type: LocationSchema, required: true }
})

// Prevent overwriting the model in Next.js development mode
const Post = models.Post || model<IPost>('Post', PostSchema)

export default Post
