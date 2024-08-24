import Image from "next/image";
import AuthButton from "./AuthButton";

export default function Header() {
  return (
    <header className="py-4  mb-4 text-center flex justify-center items-center flex-col">

      <div>
        <Image src="/logo.png" alt="Logo" width={170} height={170} />
      </div>
      <p className="mt-2 px-4 py-2  text-black rounded-lg font-bold text-base">
        Slow down and loop specific guitar parts from YouTube <br />
        videos so you can easily figure them out.{" "}
      </p>
      <AuthButton />
    </header>
  );
}
