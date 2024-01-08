'use client'

import { signIn } from "next-auth/react";

export default function NotAutenticated() {
  return (
    <div className="w-[650px] h-screen flex items-center text-center justify-center">
      <p className="text-xl w-[400px] ">Para criar e compartilhar suas mensagens, é necessário <a onClick={() => signIn('google')} className="underline hover:text-blue-300 cursor-pointer">conectar-se.</a></p>
    </div>
  )
}