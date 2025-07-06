import { PostProvider } from '@/components/posts/provider'
import { PostDetails } from '@/components/posts/details'
import { Map } from '@/components/map'
import { Header } from '@/components/header'

export default function Results() {
  return (
    <div className="flex flex-col">
      <Header />
      <PostProvider>
        <Map />
        <PostDetails />
      </PostProvider>
    </div>
  )
}
