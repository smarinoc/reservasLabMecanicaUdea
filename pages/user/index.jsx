
import CatalogMachines from '@components/CatalogMachines';
import { ReserveContext } from 'context/ReserveContext';
import React, { useState } from 'react';

const Home = () => {
  const [scheduleId, setSheduleId] = useState("")
  const [machine, setMachine] = useState({})

  const onClickReserve = () =>{

  }
 
  return (
    <div>
      <ReserveContext.Provider value={{scheduleId, setSheduleId, machine, setMachine, onClickReserve}}>
        <CatalogMachines />
      </ReserveContext.Provider>
    </div>
  );
};

export default Home;
