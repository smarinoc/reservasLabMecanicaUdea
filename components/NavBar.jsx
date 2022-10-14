import React from 'react';
import { signOut, signIn } from 'next-auth/react';
import ButtonMenu from 'components/ButtonMenu';

const NavBar = ({ rol }) => (
  <nav className='bg-gray-800 w-full px-2 sm:px-6 lg:px-8'>
    <div className='relative flex items-center justify-between h-16'>
      <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-end'>
        <div className='flex space-x-4'>
          {rol === 'admin' ? (
            <div className='flex space-x-4'>
              <ButtonMenu
                name='Máquinas'
                options={[
                  {
                    name: 'Catalogo máquinas',
                    href: '/admin/maquinas/maquinas',
                  },
                  {
                    name: 'Crear máquina',
                    href: '/admin/maquinas/crear-maquina',
                  },
                  {
                    name: 'Registros máquinas',
                    href: '/admin/maquinas/registros-maquinas',
                  },
                ]}
              />
              <ButtonMenu
                name='Horario'
                options={[
                  {
                    name: 'Crear horario',
                    href: '/admin/horarios/crear-horario',
                  },
                  {
                    name: 'Registros horarios',
                    href: '/admin/horarios/registro-horarios',
                  },
                ]}
              />
              <ButtonMenu
                name='Usuarios'
                options={[
                  {
                    name: 'Administrar usuarios',
                    href: '/admin/usuarios/administrar-usuarios',
                  },
                  {
                    name: 'Registros Usuarios',
                    href: '/admin/usuarios/registros-usuarios',
                  },
                ]}
              />
              <ButtonMenu
                name='Reservas'
                options={[
                  { name: 'Reservar', href: '/' },
                  { name: 'Mis reservas', href: '/user/reservaciones' },
                  {
                    name: 'Registros reservas',
                    href: '/admin/reservas/registros-reservas',
                  },
                ]}
              />
            </div>
          ) : (
            <></>
          )}
          {rol === 'user' ? (
            <div className='flex space-x-4'>
              <a
                key='Reservar'
                href='/'
                className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
              >
                Reservar
              </a>
              <a
                key='Mis reservas'
                href='/user/reservaciones'
                className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
              >
                Mis reservas
              </a>
              <a
                key='Formulario'
                href='/user/formulario'
                className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
              >
                Formulario
              </a>
            </div>
          ) : (
            <></>
          )}

          {rol ? (
            <button
              type='button'
              className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
              onClick={() => {
                signOut();
              }}
            >
              Cerrar sesión
            </button>
          ) : (
            <button
              type='button'
              className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
              onClick={() => {
                signIn('google');
              }}
            >
              Iniciar sesión
            </button>
          )}
        </div>
      </div>
    </div>
  </nav>
);

export default NavBar;
