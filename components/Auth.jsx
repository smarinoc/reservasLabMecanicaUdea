import { useSession } from 'next-auth/react';
import React from 'react';

const Auth = ({ children }) => {
  const { data: session } = useSession();

  if (children.type.auth.role.map((rol) => rol).includes(session?.user.rol)) {
    return children;
  }

  return <div>Loading...</div>;
};

export default Auth;
