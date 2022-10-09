import UserRegistrar from '@components/UserRegistrar';
import UserTableAdmin from '@components/UserTableAdmin';
import { getSession } from 'next-auth/react';
import React from 'react';

const UserAdmin = () => (
  <div className='flex flex-col gap-10 mx-auto my-10 justify-center w-[800px]'>
    <UserRegistrar />
    <UserTableAdmin />
  </div>
);

export default UserAdmin;

UserAdmin.auth = {
  role: ['admin'],
};

export const getServerSideProps = async (contex) => {
  const session = await getSession(contex);
  return {
    props: {
      session,
    },
  };
};
