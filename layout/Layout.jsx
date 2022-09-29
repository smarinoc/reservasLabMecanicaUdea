/* eslint-disable react/jsx-no-constructed-context-values */
import NavBar from '@components/NavBar';
import { LayoutContext } from 'context/LayoutContext';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';

const Layout = ({ children }) => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  if (status === 'loading') {
    return <></>;
  }
  let navigation;
  switch (session?.user.rol) {
    case 'user':
      navigation = [
        { name: 'Log out', href: '/api/auth/signout' },
        { name: 'Formulario', href: '/user/formulario' },
        { name: 'reservar', href: '/' },
        { name: 'Mis reservas', href: '/user/reservaciones' },
      ];
      break;
    case 'admin':
      navigation = [
        { name: 'Log out', href: '/api/auth/signout' },
        {
          name: 'Usuarios',
          href: '/admin/usuarios/administrar-usuarios',
        },
        { name: 'Máquinas', href: '/admin/maquinas/maquinas' },
        { name: 'Crear máquina', href: '/admin/maquinas/crear-maquina' },
        { name: 'Crear horario', href: '/admin/horarios/crear-horario' },
        { name: 'Horarios', href: '/admin/horarios/horarios' },
        { name: 'Reservar', href: '/' },
        { name: 'Reservas', href: '/user/reservaciones' },
        {
          name: 'Registros máquinas',
          href: '/admin/maquinas/registros-maquinas',
        },
        {
          name: 'Registros reservas',
          href: '/admin/reservas/registros-reservas',
        },
      ];
      break;
    default:
      navigation = [{ name: 'Log in', href: '/api/auth/signin/:google' }];
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
