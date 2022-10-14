import React, { useMemo } from 'react';
import { useTable, useSortBy, useFilters } from 'react-table';
import useRows from 'hooks/useRows';
import useColumns from 'hooks/useColumns';
import moment from 'moment';
import 'moment/locale/es';

const Table = ({ headers, data }) => {
  const columns = useColumns(headers);
  const dataRows = useRows(data);

  const filterTypes = useMemo(
    () => ({
      betweenDates: (rowsP, id, filterValue) =>
        rows.filter((row) => {
          const rowValue = row.values[id];
          const date = moment(rowValue, 'DD/MM/YYYY').format('YYYY-MM-DD');

          if (filterValue[0] === '') {
            if (filterValue[1] === '') {
              return true;
            }
            const res = moment(date).isBefore(
              filterValue[1]?.format('YYYY-MM-DD')
            );
            return res;
          }
          if (filterValue[1] === '') {
            if (filterValue[0] === '') {
              return true;
            }
            const res = moment(date).isAfter(
              filterValue[0]?.format('YYYY-MM-DD')
            );
            return res;
          }
          return moment(date).isBetween(
            filterValue[0].format('YYYY-MM-DD'),
            filterValue[1].format('YYYY-MM-DD'),
            'days',
            '[]'
          );
        }),
      text: (rowsP, id, filterValue) =>
        rowsP.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        }),
    }),
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: dataRows, filterTypes }, useFilters, useSortBy);

  return (
    <div className='flex flex-col gap-4'>
      <span className='block text-lg font-medium px-1 text-gray-700'>
        Número de registros: {rows.length}
      </span>
      <table
        className='table-fixed border-collapse drop-shadow-sm border-2 bg-white'
        {...getTableProps()}
      >
        <thead className='bg-gray-800'>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps}>
                  {column.Filter ? (
                    column.render('Filter')
                  ) : (
                    <div className='block text-sm font-medium text-white px-4'>
                      {column.render('Header')}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className='border-2'>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className='text-sm font-medium p-3 text-ellipsis'
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
