import { useMutation, useQuery } from '@apollo/client';
import Button from '@components/Button';
import CatalogMachines from '@components/CatalogMachines';
import Input from '@components/Input';
import Schedule from '@components/Schedule';
import { CREATE_DIARY } from 'graphql/mutations/diary';
import { GET_MACHINES_AVAILABLE } from 'graphql/queries/machine';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const createSchedule = () => {

    const [schedules, setSchedules] = useState([])
    const [machines, setMachines] = useState([])
    const [name, setName] = useState("")
    const { data, loading, refetch } = useQuery(GET_MACHINES_AVAILABLE, {
        fetchPolicy: 'cache-and-network'
    });
    const [createDiary] = useMutation(CREATE_DIARY);

    const scheduleData = {
        days: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
        hours: ["6:00 Am - 8:00 Am", "8:00 Am - 10:00 Am", "10:00 Am - 12:00 Pm", "12:00 Pm - 2:00 pm", "2:00 Pm - 4:00 Pm", "4:00 Pm - 6:00 Pm", "6:00 Pm - 8:00 Pm"]
    }


    const onItemSchedule = (day, hour) => {
        let index = schedules.findIndex(element => element.day === day && element.hour === hour)
        if (index === -1) {
            setSchedules([...schedules, { day, hour }])
        } else {
            const aux = [...schedules]
            aux.splice(index, 1)
            setSchedules(aux)
        }
    }
    const onItemMachine = (machine) => {
        let index = machines.findIndex(element => element.id === machine.id)
        if (index === -1) {
            setMachines([...machines, machine])
        } else {
            const aux = [...machines]
            aux.splice(index, 1)
            setMachines(aux)
        }
    }

    const onCreateDiary = async () => {
        let machinesCount = 0
        await createDiary({
            variables: {
                diary: {
                    name,
                    schedules,
                    machineUnits: machines.map((machine) => {
                        machinesCount += machine.count
                        return (
                            {
                                countAvailable: machine.count,
                                machineUnitId: machine.id
                            }
                        )
                    }
                    ),
                    machinesCount: String(machinesCount)
                }
            }
        })
        toast.success("Horario creado")
        clearForm()
    }

    const clearForm = () => {
        setName("")
        setSchedules([])
        setMachines([])
        refetch()
    }

    if (loading) {
        return <></>
    }

    return (
        <div className='flex flex-col gap-10 p-12 items-center w-fit mx-auto'>
            <Input name="name" placeholder="Horario 1" text="Nombre" type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
            <Schedule onItemSchedule={onItemSchedule} schedules={scheduleData} isReserve={false}/>
            <CatalogMachines isReserve={true} machines={data.getMachinesAvailable} onMachine={onItemMachine} />
            <Button onClick={onCreateDiary} w={"w-fit"} text="Crear Horario" />

        </div>
    );
};

export default createSchedule;