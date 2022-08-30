import React from 'react';
import ItemMachine from '@components/ItemMachine';

const CatalogMachines = ({ isReserve, onMachine, machines }) => (
  <div className='flex flex-row justify-center flex-wrap 2xl:grid 2xl:grid-cols-5 w-fit mx-auto gap-6 m-12'>
    {machines?.map((machine) => (
      <ItemMachine
        machine={machine}
        isReserve={isReserve}
        onClick={() => {
          onMachine(machine);
        }}
      />
    ))}
  </div>
);

export default CatalogMachines;
