import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';

const Auth = ({ children }) => {
  const { data: session } = useSession();
  const router = useRouter();

  if (children.type.auth.role.map((rol) => rol).includes(session?.user.rol)) {
    return children;
  }

  router.push('/');

  return (
    <span className='text-red-700 mx-auto mt-32 text-3xl font-semibold uppercase'>
      No Autorizado
    </span>
  );
};

export default Auth;
