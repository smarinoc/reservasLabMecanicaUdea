import NavBar from '@components/NavBar';
import { LayoutContext } from 'context/LayoutContext';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';

const Layout = ({ children }) => {
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(false);
  if (status === 'loading') {
    return <></>
  }
  var navigation
  switch (session?.user.rol) {
    case 'user':
      navigation = [
        { name: 'Log out', href: '/api/auth/signout' },
        { name: 'Formulario', href: '/formulario' },
      ]
      break;
    case 'admin':
      navigation = [
        { name: 'Log out', href: '/api/auth/signout' },
        { name: 'Registrar usuarios', href: '/registrar-usuarios' },
      ]
      break;
    default:
      navigation = [
        { name: 'Log in', href: '/api/auth/signin/:google' },
      ]
      break;
  }
  return (
    <LayoutContext.Provider value={{ loading, setLoading }}>
      <div className='flex flex-col justify-items-center w-full'>
        <NavBar navigation={navigation} />
        <div className='fixed left-10 top-96'>
          <ClipLoader size={70} color='#00F47F' loading={loading} />
        </div>
        {children}
      </div>
    </LayoutContext.Provider>
  );
};

export default Layout;