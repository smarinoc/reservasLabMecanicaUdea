import React from 'react';
import Button from './Button';

const ItemRegisterUser = ({email, onClick}) => {
    return (
        <div className='flex flex-row justify-between px-3 border-2 border-slate-300 items-center py-2'>
            <div>{email}</div>
            <Button isSubmit={false} text="Cancelar" onClick={onClick} w="w-[100px]" /> 
        </div>
    );
};

export default ItemRegisterUser;