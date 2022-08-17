
import CatalogMachines from '@components/CatalogMachines';
import { ReserveContext } from 'context/ReserveContext';
import React, { useState } from 'react';

const Home = () => {
  const [scheduleId, setSheduleId] = useState("cl6vhlgze10989ibl0rjddmnq")
  const [machine, setMachine] = useState({})

  const onClickReserve = () =>{

  }
 
  return (
    <div>
      <ReserveContext.Provider value={{scheduleId, setSheduleId, machine, setMachine, onClickReserve}}>
        <CatalogMachines isReserve={true}/>
      </ReserveContext.Provider>
    </div>
  );
};

export default Home;
