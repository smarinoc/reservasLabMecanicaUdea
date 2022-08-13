import React, { useState } from 'react';
import Input from './Input';

const InputMachineUnit = ({ aux, index,  unit }) => {
    const [location, setLocation] = useState("")
    const [count, setCount] = useState(0)
    return (
        <div className='flex flex-col gap-1 w-full border-2 border-blue-100 p-2'>
            <Input name="location" value={location} onChange={ (e) => {
                setLocation(e.target.value)
                unit.location= e.target.value
            }} text="Ubicación" type="text" />
            <Input name="count" value={count} onChange={(e) => {
                setCount(e.target.value)
                unit.count= e.target.value
            }} text="Número de unidades" type="number" />
        </div>
    );
};

export default InputMachineUnit;