import { Skeleton } from '@mui/material';
import React from 'react';

const CatalogMachinesSkeleton = () => (
  <div className='mx-auto mt-20 flex flex-row flex-wrap 2xl:grid 2xl:grid-cols-5 w-fit gap-6 m-12'>
    <Skeleton variant='rounded' width={250} height={200} />
    <Skeleton variant='rounded' width={250} height={200} />
    <Skeleton variant='rounded' width={250} height={200} />
    <Skeleton variant='rounded' width={250} height={200} />
    <Skeleton variant='rounded' width={250} height={200} />
  </div>
);

export default CatalogMachinesSkeleton;
