import { useMemo } from 'react';

const useColumns = (headers) => useMemo(() => headers, []);

export default useColumns;
