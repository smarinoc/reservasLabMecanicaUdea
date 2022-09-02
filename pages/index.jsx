/* eslint-disable no-unused-vars */
import { useMutation, useQuery } from '@apollo/client';
import Button from '@components/Button';
import CatalogMachines from '@components/CatalogMachines';
import Schedule from '@components/Schedule';
import { useLayoutContext } from 'context/LayoutContext';
import { CREATE_RESERVE } from 'graphql/mutations/reserve';
import {
  GET_MACHINES_UNIT_BY_SCHEDULE,
  GET_SCHEDULE_AVAILABLE,
} from 'graphql/queries/diary';
import { useSession } from 'next-auth/react';
import { Dialog } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ConfirmReserveDialog from '@components/ConfirmReserveDialog';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const Home = () => {
  const [schedule, setShedule] = useState({
    day: '',
    hour: '',
  });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const changeDialog = () => {
    setOpenDeleteDialog(!openDeleteDialog);
  };

  const [availableSchedules, setAvailableSchedules] = useState([]);
  const [machine, setMachine] = useState(null);
  const [selectScheduleIndex, setSelectScheduleIndex] = useState(-1);
  const layoutContext = useLayoutContext();
  const { data: session } = useSession();
  const {
    data: schedules,
    loading: schedulesLoading,
    refetch: refetchScheduleAvailable,
  } = useQuery(GET_SCHEDULE_AVAILABLE, {
    fetchPolicy: 'cache-and-network',
  });
  const router = useRouter();

  const { data, loading, refetch } = useQuery(GET_MACHINES_UNIT_BY_SCHEDULE, {
    fetchPolicy: 'cache-and-network',
    variables: {
      schedule,
    },
  });

  const [createReserve] = useMutation(CREATE_RESERVE);

  const scheduleData = {
    days: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    hours: [
      '6:00 Am - 8:00 Am',
      '8:00 Am - 10:00 Am',
      '10:00 Am - 12:00 Pm',
      '12:00 Pm - 2:00 pm',
      '2:00 Pm - 4:00 Pm',
      '4:00 Pm - 6:00 Pm',
      '6:00 Pm - 8:00 Pm',
    ],
  };

  useEffect(() => {
    layoutContext.setLoading(loading);
  }, [loading]);

  useEffect(() => {
    const indexes = [];
    if (schedules?.getScheduleAvailable) {
      schedules.getScheduleAvailable.forEach((element) => {
        indexes.push(
          scheduleData.hours.indexOf(element.hour) * scheduleData.days.length +
            scheduleData.days.indexOf(element.day)
        );
      });
    }

    setAvailableSchedules(indexes);
  }, [schedules]);

  const onItemSchedule = (day, hour, i) => {
    setShedule({
      day,
      hour,
    });
    setSelectScheduleIndex(i);
    refetch();
  };

  const onItemMachine = (machineItem) => {
    setMachine(machineItem);
  };

  const onReserve = async () => {
    const res = await createReserve({
      variables: {
        reserve: {
          machineUnitID: machine.id,
          day: schedule.day,
          hour: schedule.hour,
          userId: session.user.id,
        },
      },
    });
    switch (res.data.createReserve.id) {
      case '-1':
        toast.error('El usuario ya tiene el limite de reservas activa');
        break;
      case '-2':
        toast.error('La máquina ya se encuentra reservada');
        break;
      default:
        toast.success('Reserva creada');
        break;
    }
    refetchScheduleAvailable();
    setSelectScheduleIndex(-1);
    setMachine(null);
    setShedule({
      day: '',
      hour: '',
    });
  };

  if (schedulesLoading) return <div>Loading ...</div>;

  return (
    <div className='flex flex-col gap-16 items-center'>
      <Schedule
        schedules={scheduleData}
        onItemSchedule={onItemSchedule}
        available={availableSchedules}
        isSelect={schedule}
        selectScheduleIndexes={[selectScheduleIndex]}
        isReserve
      />
      <CatalogMachines
        isReserve
        machines={data?.getMachinesUnitBySchedule}
        onMachine={onItemMachine}
      />
      <Button
        onClick={() => {
          if (session) {
            changeDialog();
          } else {
            router.push('/api/auth/signin/:google');
          }
        }}
        text='Reservar'
        w='w-fit'
      />
      <Dialog open={openDeleteDialog} onClose={changeDialog}>
        <ConfirmReserveDialog
          closeDialog={changeDialog}
          crearReserve={onReserve}
          data={{
            name: machine?.machine?.name,
            location: machine?.location,
            day: schedule?.day,
            hour: schedule?.hour,
            userName: session?.user?.name,
            userDocument: session?.profile?.document,
          }}
        />
      </Dialog>
    </div>
  );
};

export default Home;
