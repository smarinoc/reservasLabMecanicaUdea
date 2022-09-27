import { useMemo } from 'react';

const useRows = (data) => useMemo(() => data, []);

export default useRows;
