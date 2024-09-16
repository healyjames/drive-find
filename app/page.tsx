import Image from "next/image"
import Link from "next/link"

import { Form } from "@/components/form"
import { Footer } from "@/components/footer"
import { Banner } from "@/components/banner"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <main className="h-[80vh] min-h-[80vh] w-full bg-primary-base">
      <Banner>This app is currently in Beta mode</Banner>
      <Header removeLogo={true}/>
      <div className="h-full grid grid-col grid-rows-3 justify-items-center p-4 pt-14">
        <Link href="/" className="self-center">
          <Image
            src="/logo/primary.svg"
            alt=""
            width={120}
            height={120}
          />
        </Link>
        <Form className="self-center" />
        <Footer />
      </div>
    </main>
  )
}
