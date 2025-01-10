import React, { useMemo, useState } from 'react'
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { Button } from '@mui/material'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { apiRequest, ApiResponse } from '@/utils/apiDefaults'


//işte bu backend den gelecek..
//nested data is ok, see accessorKeys in ColumnDef below
const { data } = useQuery({
  queryKey: ['units'],
  queryFn: () =>
    apiRequest<ApiResponse<TData>>({
      endpoint:'units',
      payload: {
        filter: '',
        sort: '',
        page: 10,
        pageSize:10,
      }
    }),

  placeholderData: keepPreviousData,

})



const MaterialCardList = () => {
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorFn: (row) => row.name,
        header: 'First Name',
        size: 150,
      },
      {
        accessorFn: (row) => row.code,
        header: 'Code',
        size: 150,
      },
      {
        id: 'actions', // Actions sütunu ekleniyor.
        header: 'Actions',
        size: 100,
        Cell: ({ row }) => (
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              console.log(`Silinen ID: ${row.original.id}`); // Satırdaki id'yi konsola yazdırır.
            }}
          >
            Delete
          </Button>
        ),
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return <MaterialReactTable table={table} />;
};
export { MaterialCardList };