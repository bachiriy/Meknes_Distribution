import { useMemo, useState } from 'react';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useQueryClient } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GET from '../../utils/GET';
import POST from '../../utils/POST';
import PUT from '../../utils/PUT';
import DELETE_API from '../../utils/DELETE';
import ConfirmAlert from '../Alerts/ConfirmAlert';
import { Spinner } from 'flowbite-react';

const Table = ({ columns, data, entityType, validateEntity, updatedData }) => {
  const [validationErrors, setValidationErrors] = useState({});
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [alertLoad, setAlertLoad] = useState(false);

  const [loading, setLoading] = useState(false);

  const endpoint = entityType.toLowerCase() === 'category' ? 'categories' : (entityType.toLowerCase() + 's');


  const memoizedColumns = useMemo(() => {
    return columns.map((col) => ({
      ...col,
      muiEditTextFieldProps: col.required
        ? {
          required: true,
          error: !!validationErrors[col.accessorKey],
          helperText: validationErrors[col.accessorKey],
          onFocus: () => setValidationErrors({
            ...validationErrors,
            [col.accessorKey]: undefined,
          }),
        }
        : undefined,
    }));
  }, [columns, validationErrors]);

  const queryClient = useQueryClient();

  const handleCreateEntity = async (values) => {
    const newValidationErrors = validateEntity(values);
    if (Object.values(newValidationErrors).some(Boolean)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    await POST(`${entityType}`, values);
    queryClient.invalidateQueries([entityType]);
  };

  const handleSaveEntity = async (values) => {
    const newValidationErrors = validateEntity(values);
    if (Object.values(newValidationErrors).some(Boolean)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    await PUT(`${entityType}/${values.id}`, values);
    queryClient.invalidateQueries([entityType]);
  };

  const handleDeleteEntity = async (id) => {
    
    await DELETE_API(endpoint, id);
    queryClient.invalidateQueries([entityType]);
    toast.success('Item deleted successfully');
  };

  const openDeleteConfirmModal = (row) => {
    setCurrentRow(row);
    setDeleteAlertOpen(true);
  };

  const confirmDelete = async () => {
    setAlertLoad(true);
    if (currentRow) {
      await handleDeleteEntity(currentRow.original.id);
    }
    setAlertLoad(false);
    setDeleteAlertOpen(false);
    setCurrentRow(null);
    setLoading(true);
    updatedData(await GET(endpoint, true));
    setLoading(false);
  };

  const table = useMaterialReactTable({
    columns: memoizedColumns,
    data,
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    enableEditing: true,
    getRowId: (row) => row.id,
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateEntity,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveEntity,
    renderCreateRowDialogContent: ({ table, internalEditComponents }) => (
      <>
        <DialogTitle>Create New {entityType}</DialogTitle>
        <DialogContent>{internalEditComponents}</DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} />
        </DialogActions>
      </>
    ),
    renderEditRowDialogContent: ({ table, internalEditComponents }) => (
      <>
        <DialogTitle>Edit {entityType}</DialogTitle>
        <DialogContent>{internalEditComponents}</DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (

      <Box sx={{ display: 'flex', gap: '1rem' }}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Tooltip title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        )}

      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button variant="contained" onClick={() => table.setCreatingRow(true)}>
        Create New {entityType}
      </Button>
    ),
  });

  return (
    <>
      <MaterialReactTable table={table} />
      <ConfirmAlert
        loading={alertLoad}
        msg="Voulez-vous supprimer cet élément ?"
        open={deleteAlertOpen}
        handleClose={() => setDeleteAlertOpen(false)}
        cancel={() => {
          setDeleteAlertOpen(false);
          setCurrentRow(null);
        }}
        confirm={confirmDelete}
      />
      <ToastContainer />
    </>
  );
};

export default Table;
