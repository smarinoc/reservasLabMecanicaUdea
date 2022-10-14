import { useSession } from 'next-auth/react';
import React from 'react';

const Auth = ({ children }) => {
  const { data: session } = useSession();
  if (children.type.auth.role.map((rol) => rol).includes(session?.user.rol)) {
    if (session?.user.rol === 'admin') {
      return children;
    }
    if (
      session?.user.rol === 'user' &&
      session?.user.profile.state !== 'inhabilitado'
    ) {
      return children;
    }
  }

  return (
    <span className='text-red-700 mx-auto mt-32 text-3xl font-semibold uppercase'>
      No Autorizado
    </span>
  );
};

export default Auth;
