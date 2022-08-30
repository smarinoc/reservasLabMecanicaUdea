import { createContext, useContext } from 'react';

export const LayoutContext = createContext({
  loading: false,
  setLoading: () => {},
});

export const useLayoutContext = () => useContext(LayoutContext);
