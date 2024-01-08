"use client";

import { api } from "@/lib/api";
import Cookie from "js-cookie";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function FormContent() {
  const [clicked, setClicked] = useState(false);
  const [id, setId] = useState("");
  const token = Cookie.get("token");

  async function createContent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);

      const contentBody = await api.post(
        "/content",
        {
          content: formData.get("content"),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setClicked(true);
      setId(contentBody.data.contentCreated.id);
    } catch (error) {
      console.error("Erro ao criar conteúdo:", error);
    }
  }

  return (
    <div className="w-[665px] h-screen items-center flex">
      <form onSubmit={createContent} className="flex flex-1 flex-col gap-2 items-center">
        <p className="w-[500px] text-center">Crie, salve e compartilhe uma mensagem natalina para a pessoa que você ama 😍</p>
        <textarea 
          name="content"
          className="w-[500px] bg-zinc-900 min-h-[300px] flex-1 resize-none rounded border-[1px] border-zinc-300 p-0 text-lg leading-relaxed text-gray-200 placeholder:text-gray-400"
        />
        <button
          type="submit"
          onClick={() => setClicked(true)}
          className="text-gray-200"
        >
          Salvar
        </button>
        {id ? (
          <div>
            <Link
              href={`http://localhost:3000/pages/users/${id}`}
              key={id}
            >{`http://localhost:3000/pages/users/${id}`}</Link>
          </div>
        ) : null}
      </form>
    </div>
  );
}
