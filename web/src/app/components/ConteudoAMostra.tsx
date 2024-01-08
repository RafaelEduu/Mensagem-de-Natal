'use client'

import { api } from "@/lib/api";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Content {
  id: string,
  content: string, 
  createdAt: string
}

export default function ConteudoAMostra() {
  const [content, setContent] = useState<Content | null>(null);
  const router = useRouter()


  useEffect(() => {
    const id = router.query.id as string; 
    if (id) {
      fetchContent(id);
    }
  }, [router.query.id]);

  const fetchContent = async (id: string) => {
    try {
      const response = await api.get(`/content/${id}`);
      const fetchedContent: Content = response.data;
      setContent(fetchedContent);
    } catch (error) {
      console.error("Erro ao buscar conteúdo:", error);
    }
  };

  if (!content) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="text-gray-200">
      <p>Oi</p>
      <h1>{content.content}</h1> 
      <p>{content.createdAt}</p>
    </div>
  );
}
