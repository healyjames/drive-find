import Image from "next/image";
import { LogoAnimation } from "./components/logo-animation";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LogoAnimation />
    </main>
  );
}
