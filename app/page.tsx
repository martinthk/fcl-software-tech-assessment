import Image from "next/image";
import Form from "../components/Form";

export default function Home() {
  return (
    <main>
      <Image
        src="/future_corporation_ltd__logo Background Removed.png"
        alt="FCL Logo"
        width={50}
        height={50}
        className="mt-10 ml-10"
      />

      <div className="flex flex-col items-center justify-center min-h-screen">
        <Form />
      </div>
    </main>
  );
}
