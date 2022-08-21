
import { useQuery } from '@apollo/client';
import CatalogMachines from '@components/CatalogMachines';
import Schedule from '@components/Schedule';
import { useLayoutContext } from 'context/LayoutContext';
import { GET_MACHINES_UNIT_BY_SCHEDULE, GET_SCHEDULE_AVAILABLE } from 'graphql/queries/diary';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [schedule, setShedule] = useState({
    day: "",
    hour: ""
  })
  const [availableAux, setAvailable] = useState([])
  const [machine, setMachine] = useState({})
  const  layoutContext = useLayoutContext()

  const { data:schedules, loading: schedulesLoading } = useQuery(GET_SCHEDULE_AVAILABLE, {
    fetchPolicy: 'cache-and-network'
  });

  const { data, loading, refetch } = useQuery(GET_MACHINES_UNIT_BY_SCHEDULE, {
    fetchPolicy: 'cache-and-network',
    variables: {
      schedule
    },
  });

  const scheduleData ={
    days:  ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
    hours:  ["6:00 Am - 8:00 Am", "8:00 Am - 10:00 Am", "10:00 Am - 12:00 Pm", "12:00 Pm - 2:00 pm", "2:00 Pm - 4:00 Pm", "4:00 Pm - 6:00 Pm", "6:00 Pm - 8:00 Pm"]
   }

   var available = []

   useEffect(()=>{
    layoutContext.setLoading(loading)
   }, [loading])

   useEffect(()=>{
     if(schedules?.getScheduleAvailable){
      schedules.getScheduleAvailable.forEach(element => {
        available.push(scheduleData.hours.indexOf(element.hour)*scheduleData.days.length + scheduleData.days.indexOf(element.day))
      });  
     }

     setAvailable(available)
   },[schedules])

  const onItemSchedule = (day, hour) =>{
    setShedule({
      day,
      hour
    })
    refetch()
  }

  if(schedulesLoading) return <div>Loading ...</div>
 
  return (
    <div className='flex flex-col gap-16'>
        <Schedule schedules={scheduleData} onItemSchedule={onItemSchedule} available={availableAux} isReserve={true}/>
        <CatalogMachines isReserve={true} machines={data?.getMachinesUnitBySchedule}/>
    </div>
  );
};

export default Home;
