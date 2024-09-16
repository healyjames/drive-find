import Link from "next/link"

import { FacebookIcon, InstagramIcon, XIcon } from "@/components/icons"

export const Footer = () => {
    const linkStyle = "p-2 rounded-full flex justify-center items-center transition-all duration-500 hover:bg-primary-base cursor-pointer"

    return (
        <div className="self-end flex justify-between items-center w-full px-4">
          <div><p className="text-xs">© DriveFind by <Link href="https://jameshealy.co.uk" className="anchor-link" target="_blank">James Healy</Link></p></div>
          <div className="flex flex-row gap-2 p-2">
            <Link href="#" className={linkStyle}>
              <FacebookIcon />
            </Link>
            <Link href="#" className={linkStyle}>
              <InstagramIcon />
            </Link>
            <Link href="#" className={linkStyle}>
              <XIcon />
            </Link>
          </div>
        </div>
    )
}