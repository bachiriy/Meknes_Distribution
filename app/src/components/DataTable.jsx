import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

const Table = ({data, columns}) => {

  const memoizedColumns = useMemo(() => columns, [columns]);
  const memoizedData = useMemo(() => data, [data]);

  const table = useMaterialReactTable({
    columns,
    data, 
  });

  return <MaterialReactTable icons={'hey'} table={table} />;
};

export default Table;
