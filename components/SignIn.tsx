import { signIn } from "@/auth";
import { FcGoogle } from "react-icons/fc";

export default function GoogleSignInButton() {
  async function handleSignIn() {
    "use server";
    await signIn("google");
  }

  return (
    <form action={handleSignIn} className="w-full">
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-3 rounded-lg border bg-white text-black px-4 py-2.5 text-sm font-medium shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <FcGoogle className="text-xl" />
        Đăng nhập
      </button>
    </form>
  );
}