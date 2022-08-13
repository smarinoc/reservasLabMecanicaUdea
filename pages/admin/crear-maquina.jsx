import Button from '@components/Button';
import Input from '@components/Input';
import InputMachineUnit from '@components/InputMachineUnit';
import TextArea from '@components/TextArea';
import React, { useState } from 'react';

const createMachine = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [recommendation, setRecommendation] = useState("")
    const [recommendations, setRecommendations] = useState([])
    const [units, setUnits] = useState([{
        location: "",
        count: 0
    }])
    const addLocation = () =>{
        setUnits([...units, {location:"", count: 0}])
    }

    const onSubmitRecommendation = (e) => {
        e.preventDefault(false)
        setRecommendation("");
        setRecommendations([...recommendations, { recommendation }])
    }
    return (

        <div className='flex flex-col drop-shadow-sm border-2 px-8 w-[876px] mx-auto gap-5 py-3 bg-white items-center mt-10'>
            <Input name="name" value={name} onChange={(e) => setName(e.target.value)} text="Nombre" type="text" />
            <TextArea name="description" value={description} onChange={(e) => setDescription(e.target.value)} text="Descripción" />
            <div className='w-full flex flex-col gap-1'>
                <form className='w-full flex flex-row gap-2 items-end' onSubmit={onSubmitRecommendation}>
                    <Input name="recommendation" value={recommendation} onChange={(e) => setRecommendation(e.target.value)} text="Añadir recomendación" type="text" />
                    <Button isSubmit={true} text="Añadir" w="w-[100px]" />
                </form>
                <ul>
                    {
                        recommendations.map((item, index) => <li className='text-black px-3 font-medium' key={index}>{item.recommendation}</li>)
                    }
                </ul>
            </div>{
                units.map((item) =>
                    <div className='w-full'>
                        <InputMachineUnit unit={item}/>
                    </div>
                )
            }
            <Button text="Añadir otra ubicación" onClick={addLocation}/>

        </div>
    );
};

export default createMachine;