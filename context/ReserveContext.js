import { createContext, useContext } from 'react';

export const ReserveContext = createContext({
  scheduleId: '',
  setScheduleId: () => {},
  machine: {
    id: '',
    location: '',
  },
  setMachine: () => {},
  onClickReserve: () => {},
});

export const useReserveContext = () => useContext(ReserveContext);
