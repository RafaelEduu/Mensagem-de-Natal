"use client";

import { useSession } from "next-auth/react";
import NewContentForm from "./NewContentForm";
import NotAutenticated from "./NotAutenticated";

export default function Separador() {
  const session = useSession();

  const teste =
    session.status === "authenticated" ? (
      <NewContentForm />
    ) : (
      <NotAutenticated />
    );

  return teste;
}
