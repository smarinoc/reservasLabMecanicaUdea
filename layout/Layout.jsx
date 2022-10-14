/* eslint-disable react/jsx-no-constructed-context-values */
import NavBar from '@components/NavBar';
import { Backdrop } from '@mui/material';
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

  return (
    <LayoutContext.Provider value={{ loading, setLoading }}>
      <div className='flex flex-col justify-items-center w-full'>
        <NavBar rol={session?.user.rol} />
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <ClipLoader size={70} color='#00F47F' loading={loading} />
        </Backdrop>
        {children}
      </div>
    </LayoutContext.Provider>
  );
};

export default Layout;
