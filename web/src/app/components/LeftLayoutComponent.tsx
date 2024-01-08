"use client";

import { useSession } from "next-auth/react";
import Profile from "./Profile";
import SignIn from "./SignIn";

export default function LeftComponent() {
  const session = useSession();

  return (
    <div className="bg-my-image-bg min-h-screen w-[700px] bg-cover bg-left border-r border-white">
      <div className="h-screen flex flex-col justify-between">
        <div>
          {session.status === "authenticated" ? <Profile /> : <SignIn />}
        </div>
        <div className="px-10">
          <p className="text-4xl w-[550px] font-alt">
            Crie e envie uma mensagem como presente de natal para as pessoas que
            você ama!
          </p>
        </div>
        <div className="p-10">
          <p className="font-alt">Feito por: <a href="https://www.instagram.com/rafaeleduuu/" className="hover:text-blue-300">Rafael Scherer</a></p>
        </div>
      </div>
    </div>
  );
}
