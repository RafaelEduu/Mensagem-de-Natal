'use client'

import { User } from "lucide-react";
import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <div>
      <a onClick={() => signIn("google")} className="cursor-pointer flex flex-row gap-3 items-center text-left hover:text-gray-50 p-10">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
          <User className="h-5 w-5 text-gray-500" />
        </div>

        <p className="max-w-[140px] text-sm leading-snug">
          <span className="underline">Crie sua conta</span> e salve suas
          memórias
        </p>
      </a>
    </div>
  );
}
