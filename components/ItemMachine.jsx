import React from 'react';
import Image from 'next/image'
import Button from './Button';
import { useReserveContext } from 'context/ReserveContext';

const ItemMachine = ({ machine }) => {

    const reserveContext = useReserveContext()
    return (
        <button onClick={ async () => {
            await reserveContext.setMachine(machine)
            reserveContext.onClickReserve()
        }}>
            <div className='flex flex-col items-center gap-3 bg-white rounded-md w-fit shadow-md pb-4 hover:border-2 hover:border-[#26DB84] '>
                <Image src={machine.machine.image} alt='no' width={250} height={150} className='rounded-t-md' />
                <div className='flex flex-col items-center'>
                    <span className='text-lg font-semibold px-1 text-gray-700'>{machine.machine.name}</span>
                    <span className='text-base font-normal text-gray-700'>{machine.location}</span>
                </div>
                <Button text='Detalles' />
            </div>
        </button>
    );
};
export default ItemMachine;