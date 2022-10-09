import React, { useEffect, useState } from 'react';
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
import { useLayoutContext } from 'context/LayoutContext';
import CatalogMachinesSkeleton from 'components/CatalogMachinesSkeleton';

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
  const layoutContext = useLayoutContext();
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
    fetchPolicy: 'cache-and-network',
  });

  const [validateFormDiary, { loading: loadingValidate }] = useLazyQuery(
    VALIDATE_FORM_DIARY,
    {
      fetchPolicy: 'network-only',
    }
  );

  useEffect(() => {
    layoutContext.setLoading(loadingValidate);
  }, [loadingValidate]);

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

  return (
    <div className='flex flex-col gap-8 p-12 items-center w-fit mx-auto mb-10'>
      <form onSubmit={onSubmit} className='flex flex-col items-center'>
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
        <span className='text-2xl font-semibold mx-auto text-gray-700 pt-10'>
          Seleccione los horarios
        </span>
        <Schedule
          onItemSchedule={onItemSchedule}
          type='formSchedule'
          alreadyChosen={alreadyChosenSchedule}
        />
        <span className='text-2xl font-semibold mx-auto text-gray-700 pt-10'>
          Seleccione las máquinas
        </span>
        {loading ? (
          <CatalogMachinesSkeleton />
        ) : (
          <CatalogMachines
            type='formSchedule'
            machines={machinesUnits.getMachinesUnits}
            onMachine={onItemMachine}
            alreadyChosen={alreadyChosenMachines}
          />
        )}
        {type === 'edit' ? (
          <div className='flex flex-row w-full justify-around'>
            <Button onClick={onDeleteP} className='w-60' text='Eliminar' />
            <Button isSubmit className='w-60' text='Editar' />
          </div>
        ) : (
          <Button isSubmit className='w-60' text='Crear' />
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
