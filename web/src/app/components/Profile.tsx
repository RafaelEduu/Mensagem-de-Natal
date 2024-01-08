'use client'

import { signOut, useSession } from "next-auth/react";

export default function Profile() {
  const session = useSession();
  const image = session.data?.user?.image   


  return (
    <div className="flex items-center gap-3 text-left p-10">
      {/* <Image
        src={image}
        width={40}
        height={40}
        alt=""
        className="h-10 w-10 rounded-full"
      /> */}

      <p className="max-w-[140px] text-sm leading-snug">
        {session.data?.user?.name}
        <a
          onClick={() => signOut()}
          className="block text-red-400 hover:text-red-300 cursor-pointer"
        >
          Quero Sair
        </a>
      </p>
    </div>
  );
}
