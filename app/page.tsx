import Image from "next/image"

import { Form } from "./components/form/form";

export default function Home() {
  return (
    <main className="h-screen min-h-screen w-full bg-primary-base p-4">
      <div className="h-full grid grid-col grid-rows-3 justify-items-center">
        <Image
          src="/logo/primary.svg"
          alt=""
          width={120}
          height={120}
          className="self-start"
        />
        <Form
          className="self-center"
        />
        <div className="self-end">
          <p>socials</p>
        </div>
      </div>
    </main>
  );
}
