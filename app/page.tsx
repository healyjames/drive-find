import Image from "next/image"
import Link from "next/link"

import { Form } from "../components/form/form"
import { FacebookIcon, InstagramIcon, XIcon } from "../components/icons/icon"
import { Banner } from "../components/banner/banner";

export default function Home() {
  return (
    <main className="h-screen min-h-screen w-full bg-primary-base">
      <Banner>This app is currently in Beta mode</Banner>
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
        
        <div className="self-end flex justify-between items-center w-full px-4">
          <div><p className="text-xs">© DriveFind by <Link href="https://jameshealy.co.uk" className="anchor-link" target="_blank">James Healy</Link></p></div>
          <div className="flex flex-row gap-2 p-2">
            <Link href="#" className="p-2 rounded-full flex justify-center items-center transition-all duration-500 hover:bg-primary-base cursor-pointer">
              <FacebookIcon />
            </Link>
            <Link href="#" className="p-2 rounded-full flex justify-center items-center transition-all duration-500 hover:bg-primary-base cursor-pointer">
              <InstagramIcon />
            </Link>
            <Link href="#" className="p-2 rounded-full flex justify-center items-center transition-all duration-500 hover:bg-primary-base cursor-pointer">
              <XIcon />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
