import { jwtDecode } from 'jwt-decode';
import { cookies } from "next/headers";

interface User {
  sub?: string;
  name?: string;
}

export function getUser(): User | null {
  const token = cookies().get('next-auth.session-token');

  if (!token) {
    console.log('Não autenticado');
    return null;
  }

  try {
    const user: User = jwtDecode(token.value) as User;
    return user;
  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
    return null;
  }
}