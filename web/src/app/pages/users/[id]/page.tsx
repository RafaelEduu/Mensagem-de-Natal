/* 'use client'
 
import { useSearchParams } from 'next/navigation'
 
export default function SearchBar() {
  const searchParams = useSearchParams() 
 
  const userId = searchParams.get('id')
  console.log( searchParams.get('id'))
 
  // URL -> `/dashboard?search=my-project`
  // `search` -> 'my-project'
  return <p>Post: {userId}</p>
} */

// pages/user.tsx
import { api } from '@/lib/api';

const UserDetail = async ({ params }: any) => {
  const id = params.id;
  const response = await api.get(`/content/${id}`)

  return (
    <div className="text-gray-200">
      <h1>User Details</h1>
      <p>User ID from Router: {id}</p>
      <p>Seu presente: {response.data.content}</p>
    </div>
  );
};

export default UserDetail;
