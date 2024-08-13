import Image from "next/image"

import { Form } from "./components/form/form";
import { FacebookIcon, InstagramIcon, XIcon } from "./components/icons/icon";

export default function Home() {
  return (
    <main className="h-screen min-h-screen w-full bg-primary-base lg:grid lg:grid-col grid-cols-home">
      <div className="relative hidden lg:block">
        <p className="relative z-10">
          Photo by{' '}
          <a href="https://unsplash.com/@grebenyev?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Vlad Grebenyev
          </a>
        </p>
        <Image
          src="/images/lambo-flames.jpg"
          alt="A green Lamborghini"
          layout="fill" // This makes sure the image covers the container
          objectFit="cover" // Ensures the image covers the container without distortion
          className="absolute inset-0 z-0" // Positions the image in the background
        />
      </div>


      <div className="h-full grid grid-col grid-rows-3 justify-items-center p-4">
        <Image
          src="/logo/primary.svg"
          alt=""
          width={120}
          height={120}
          className="self-start"
        />

        <Form className="self-center" />
        
        <div className="self-end flex justify-between items-center w-full px-4">
          <div><p className="text-xs">© DriveFind by <a href="#" className="link link--black link--hover-underlined" target="_blank">James Healy</a></p></div>
          <div className="flex flex-row gap-2 p-2">
            <a href="#" className="p-2 rounded-full flex justify-center items-center transition-all duration-500 hover:bg-secondary-base cursor-pointer">
              <FacebookIcon />
            </a>
            <a href="#" className="p-2 rounded-full flex justify-center items-center transition-all duration-500 hover:bg-secondary-base cursor-pointer">
              <InstagramIcon />
            </a>
            <a href="#" className="p-2 rounded-full flex justify-center items-center transition-all duration-500 hover:bg-secondary-base cursor-pointer">
              <XIcon />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
