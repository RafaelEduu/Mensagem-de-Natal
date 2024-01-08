import NewContentForm from "@/app/components/NewContentForm";

export default async function Home() {
  return (
    <div>
      <p>
        Escreva uma mensagem carinhosa, salve e compartilhe o link com a pessoa
        desejada 😍
      </p>
      <NewContentForm />
    </div>
  );
}
