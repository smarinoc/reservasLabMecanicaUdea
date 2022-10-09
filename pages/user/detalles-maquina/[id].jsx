import { useQuery } from '@apollo/client';
import FormSkeleton from '@components/FormSkeleton';
import { GET_MACHINE_DETAILS } from 'graphql/queries/machine';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { BsDiamondFill } from 'react-icons/bs';

const MachineDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: resData, loading } = useQuery(GET_MACHINE_DETAILS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      id,
    },
  });

  if (loading) {
    return <FormSkeleton />;
  }

  return (
    <div className='flex flex-col drop-shadow-sm border-2 px-8 w-[876px] mx-auto gap-5  py-10 bg-white items-center my-10'>
      <Image
        src={resData.getMachineDetails.image}
        alt='no'
        width={400}
        height={250}
      />
      <div className='flex flex-col w-full'>
        <span className='text-lg font-medium text-black'>Nombre</span>
        <span className='text-sm font-medium text-gray-700'>
          {resData.getMachineDetails.name}
        </span>
      </div>
      <div className='flex flex-col w-full'>
        <span className='text-lg font-medium text-black'>Descripción</span>
        <span className='text-sm font-medium text-gray-700'>
          {resData.getMachineDetails.description}
        </span>
      </div>
      <div className='flex flex-col w-full'>
        <span className='text-lg font-medium text-black'>Recomendaciones</span>
        <ul>
          {resData.getMachineDetails.recommendations.map((item) => (
            <li className='flex flex-row items-center w-full pr-8 my-2'>
              <BsDiamondFill color='#00F47F' className='ml-2' />
              <div className='text-gray-700 px-3 font-medium whitespace-normal w-full'>
                {item}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex flex-col w-full'>
        <span className='text-lg font-medium text-black'>Ubicación</span>
        <span className='text-sm font-medium text-gray-700'>
          {resData.getMachineDetails.location}
        </span>
      </div>
      <div className='flex flex-col w-full'>
        <span className='text-lg font-medium text-black'>Serial</span>
        <span className='text-sm font-medium text-gray-700'>
          {resData.getMachineDetails.serial}
        </span>
      </div>
    </div>
  );
};

export default MachineDetails;

export const getServerSideProps = async (contex) => {
  const session = await getSession(contex);
  return {
    props: {
      session,
    },
  };
};
