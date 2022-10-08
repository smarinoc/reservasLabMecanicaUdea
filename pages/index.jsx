import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import Button from '@components/Button';
import CatalogMachines from '@components/CatalogMachines';
import Schedule from '@components/Schedule';
import { useLayoutContext } from 'context/LayoutContext';
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
import moment from 'moment';
import 'moment/locale/es';
import { CREATE_RESERVATION } from 'graphql/mutations/reservation';

const Home = () => {
  const [schedule, setShedule] = useState({ id: '-1' });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const changeDialog = () => {
    setOpenDeleteDialog(!openDeleteDialog);
  };
  const [availableSchedules, setAvailableSchedules] = useState([]);
  const [machine, setMachine] = useState(null);
  const layoutContext = useLayoutContext();
  const { data: session } = useSession();
  const {
    data: schedules,
    loading,
    refetch: refetchScheduleAvailable,
  } = useQuery(GET_SCHEDULE_AVAILABLE, {
    fetchPolicy: 'cache-and-network',
  });
  const router = useRouter();

  const [getMachinesUnitBySchedule, { data, loading: loadingMachines }] =
    useLazyQuery(GET_MACHINES_UNIT_BY_SCHEDULE, {
      fetchPolicy: 'cache-and-network',
      variables: {
        id: schedule.id,
      },
    });

  const [createReservation, { loading: loadingCreate }] =
    useMutation(CREATE_RESERVATION);

  useEffect(() => {
    layoutContext.setLoading(loadingCreate || loadingMachines);
  }, [loadingCreate, loadingMachines]);

  useEffect(() => {
    if (schedules) {
      setAvailableSchedules(schedules.getScheduleAvailable);
    }
  }, [schedules]);

  const onItemSchedule = (scheduleP) => {
    setShedule(scheduleP);
    getMachinesUnitBySchedule();
  };

  const onItemMachine = (machineItem) => {
    setMachine(machineItem);
  };

  const onReserve = async () => {
    const res = await createReservation({
      variables: {
        reservation: {
          machineUnitId: machine.id,
          scheduleId: schedule.id,
          userId: session.user.id,
          date: moment().startOf('week').add(schedule.indexDay, 'days'),
        },
      },
    });
    switch (res.data.createReservation.id) {
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
    setMachine(null);
    setShedule({ id: '-1' });
  };

  if (loading) return <div>Loading ...</div>;

  return (
    <div className='flex flex-col gap-16 items-center'>
      <Schedule
        onItemSchedule={onItemSchedule}
        availableSchedules={availableSchedules}
        type='reserve'
      />
      <CatalogMachines
        type='reserve'
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
            day: `${schedule?.day} ${moment()
              .startOf('week')
              .add(schedule.indexDay, 'days')
              .format('D MMMM')}`,
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
