import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

const Table = ({data, columns}) => {
  const table = useMaterialReactTable({
    columns,
    data
  });
  

  return <MaterialReactTable icons={'hey'} table={table} />;
};

export default Table;
