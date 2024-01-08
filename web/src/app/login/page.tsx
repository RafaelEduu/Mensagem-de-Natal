"use client" 

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { redirect } from "react-router-dom";

const Login = () => {
  const session = useSession()
  const router = useRouter();

  useEffect(() => {
    if (session.status === 'loading' || session.status === 'authenticated') {
      router.push('/content/new');
    }
  }, [session.status, router]);  

  console.log(session.status)
  
  if(session.status === 'loading') {
    return (
      <p>Loading...</p>
    )
  }

  if(session.status === 'authenticated') {
    return ( 
      redirect("/content/new"),
      <button onClick={() => signOut()}>Sair</button> 
    )
  }

  if(session.status === 'unauthenticated') {
    return (
      <button onClick={() => signIn('google')}>Entrar</button>
    )
  }
}

export default Login