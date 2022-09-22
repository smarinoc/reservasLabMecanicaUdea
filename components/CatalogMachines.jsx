import React, { useState } from 'react';
import ItemMachine from '@components/ItemMachine';

const CatalogMachines = ({ type, onMachine, machines, alreadyChosen }) => {
  const [select, setSelect] = useState(null);

  return (
    <div className='flex flex-row justify-center flex-wrap 2xl:grid 2xl:grid-cols-5 w-fit mx-auto gap-6 m-12'>
      {machines?.map((machine) => {
        const found = alreadyChosen?.find(
          (element) => element.id === machine.id
        );
        return (
          <ItemMachine
            machine={machine}
            type={type}
            isSelectParam={
              type === 'formSchedule' ? !!found : machine.id === select
            }
            onClick={() => {
              setSelect(machine.id);
              onMachine(machine);
            }}
          />
        );
      })}
    </div>
  );
};

export default CatalogMachines;
