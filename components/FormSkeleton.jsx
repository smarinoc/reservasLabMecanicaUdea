import { Skeleton } from '@mui/material';
import React from 'react';

const FormSkeleton = () => (
  <div className='mx-auto mt-20 flex flex-col gap-5 w-[800px]'>
    <Skeleton variant='rounded' height={100} />
    <Skeleton variant='rounded' height={200} />
    <Skeleton variant='rounded' height={300} />
  </div>
);

export default FormSkeleton;
