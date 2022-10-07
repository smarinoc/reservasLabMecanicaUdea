import React, { useState } from 'react';
import Button from 'components/Button';
import CatalogMachines from 'components/CatalogMachines';
import Input from 'components/Input';
import Schedule from 'components/Schedule';
import { GET_MACHINES_UNITS } from 'graphql/queries/machine';
import { useLazyQuery, useQuery } from '@apollo/client';
import PickerDate from 'components/PickerDate';
import { VALIDATE_FORM_DIARY } from 'graphql/queries/diary';
import { Dialog } from '@mui/material';
import ValidFormScheduleDialog from 'components/ValidFormScheduleDialog';

const FormSchedule = ({
  type,
  diaryId,
  schedulesP,
  machinesP,
  nameP,
  firstDateP,
  lastDateP,
  onSubmitP,
  onDeleteP,
  alreadyChosenSchedule,
  alreadyChosenMachines,
}) => {
  const [name, setName] = useState(nameP || '');
  const [schedules, setSchedules] = useState(schedulesP || []);
  const [machines, setMachines] = useState(machinesP || []);
  const [firstDate, setFirstDate] = useState(firstDateP || null);
  const [lastDate, setLastDate] = useState(lastDateP || null);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const changeDialog = () => {
    setOpenDeleteDialog(!openDeleteDialog);
  };

  const [noValidSchedules, setNoValidSchedules] = useState([]);

  const {
    data: machinesUnits,
    loading,
    refetch,
  } = useQuery(GET_MACHINES_UNITS, {
    fetchPolicy: 'network-only',
  });

  const [validateFormDiary] = useLazyQuery(VALIDATE_FORM_DIARY, {
    fetchPolicy: 'network-only',
  });

  const onItemSchedule = (scheduleSelect) => {
    const index = schedules.findIndex(
      (element) => element.id === scheduleSelect.id
    );
    if (index === -1) {
      setSchedules([...schedules, { id: scheduleSelect.id }]);
    } else {
      const aux = [...schedules];
      aux.splice(index, 1);
      setSchedules(aux);
    }
  };
  const onItemMachine = (machine) => {
    const index = machines.findIndex((element) => element.id === machine.id);
    if (index === -1) {
      setMachines([...machines, machine]);
    } else {
      const aux = [...machines];
      aux.splice(index, 1);
      setMachines(aux);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault(false);
    console.log(diaryId);
    const res = await validateFormDiary({
      variables: {
        machineUnitOnSchedule: {
          schedules,
          machineUnits: machines.map((item) => ({ id: item.id })),
          diaryId,
        },
      },
    });

    const noValid = res.data.validateFormDiary.filter((item) => !item.isValid);

    if (noValid.length > 0) {
      setNoValidSchedules(
        noValid.map((item) => {
          const findMachine = machines.find(
            (element) => element.id === item.machineUnitId
          );

          return {
            day: item.day,
            hour: item.hour,
            name: findMachine.machine.name,
            serial: findMachine.serial,
          };
        })
      );
      changeDialog();
    } else {
      await onSubmitP({
        name,
        schedules,
        machines,
        firstDate: firstDate._d || firstDate,
        lastDate: lastDate._d || lastDate,
      });
      refetch();
      setName('');
      setSchedules([]);
      setMachines([]);
      setFirstDate(null);
      setLastDate(null);
    }
  };

  if (loading) {
    return <div>loading.........</div>;
  }

  return (
    <div className='flex flex-col gap-8 p-12 items-center w-fit mx-auto'>
      <form onSubmit={onSubmit}>
        <div className='flex flex-col drop-shadow-sm border-2 px-8 w-[876px] mx-auto gap-5 py-3 bg-white items-center'>
          <Input
            name='name'
            placeholder='Horario 1'
            text='Nombre'
            type='text'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <PickerDate
            name='firstDate'
            text='Fecha Inicial'
            value={firstDate}
            onChange={(e) => {
              setFirstDate(e);
            }}
          />
          <PickerDate
            name='secondDate'
            text='Fecha final'
            value={lastDate}
            onChange={(e) => {
              setLastDate(e);
            }}
          />
        </div>

        <Schedule
          onItemSchedule={onItemSchedule}
          type='formSchedule'
          alreadyChosen={alreadyChosenSchedule}
        />
        <CatalogMachines
          type='formSchedule'
          machines={machinesUnits.getMachinesUnits}
          onMachine={onItemMachine}
          alreadyChosen={alreadyChosenMachines}
        />
        {type === 'edit' ? (
          <div className='flex flex-row w-full justify-around'>
            <Button isSubmit w='w-fit' text='Editar' />
            <Button onClick={onDeleteP} w='w-fit' text='Eliminar' />
          </div>
        ) : (
          <Button isSubmit w='w-fit' text='Crear' />
        )}
      </form>
      <Dialog open={openDeleteDialog} onClose={changeDialog}>
        <ValidFormScheduleDialog
          schedules={noValidSchedules}
          closeDialog={changeDialog}
        />
      </Dialog>
    </div>
  );
};

export default FormSchedule;
