import React from 'react';

const Layout = ({children}) => {
  return (
    <div className='flex flex-col justify-items-center w-full'>
      <div>HOla mundo</div>
      {children}
    </div>
  );
};

export default Layout;