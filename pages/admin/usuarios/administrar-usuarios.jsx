import UserRegistrar from '@components/UserRegistrar';
import UserTableAdmin from '@components/UserTableAdmin';
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
