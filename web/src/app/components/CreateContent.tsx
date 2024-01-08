import { api } from "@/lib/api"
import { FormEvent } from "react"

export async function createContent(event: FormEvent<HTMLFormElement>) {
  event.preventDefault()

  const formData = new FormData(event.currentTarget)

  await api.post('/content', {
    content: formData.get('content')
  })

}