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

import { MenuItem, Select, TextField } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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

  const ENDPOINT = entityType.toLowerCase() === 'category' ? 'categories' : `${entityType.toLowerCase()}s`;

  const queryClient = useQueryClient();

  const memoizedColumns = useMemo(() => {
    return columns.map((col) => ({
      ...col,
      muiEditTextFieldProps: col.required
        ? {
          required: true,
          error: !!validationErrors[col.accessorKey],
          helperText: validationErrors[col.accessorKey],
          onFocus: () =>
            setValidationErrors((prev) => ({
              ...prev,
              [col.accessorKey]: undefined,
            })),
        }
        : col.accessorKey === 'type'
          ? {
            select: true,
            SelectProps: {
              displayEmpty: true,
              renderValue: (value) => (value ? value : 'Select Role'),
            },
            children: [
              <MenuItem key="Particulier" value="Particulier">Particulier</MenuItem>,
              <MenuItem key="Entreprise" value="Entreprise">Entreprise</MenuItem>,
            ],
          }
          : undefined,
    }));
  }, [columns, validationErrors]);

  const queryKey = `${entityType.toLowerCase()}s`;

  const createEntity = useMutation({
    mutationFn: async (values) => await POST(ENDPOINT, values),
    onSuccess: async () => {
      queryClient.invalidateQueries(queryKey);
      toast.success('Item created successfully');
      setLoading(true)
      updatedData(JSON.parse(sessionStorage.getItem(ENDPOINT)));
      setLoading(false)
    },
  });

  const updateEntity = useMutation({
    mutationFn: async (values) => await PUT(ENDPOINT, values.id, values),
    onSuccess: async () => {
      queryClient.invalidateQueries(ENDPOINT);
      toast.success('Item updated successfully');
    },
  });

  const deleteEntity = useMutation({
    mutationFn: async (id) => await DELETE_API(ENDPOINT, id),
    onSuccess: async () => {
      queryClient.invalidateQueries(ENDPOINT);
      toast.success('Item deleted successfully');
    },
  });

  const handleCreateEntity = async ({ values, table }) => {
    const newValidationErrors = validateEntity(values);
    if (Object.values(newValidationErrors).some(Boolean)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    await createEntity.mutateAsync(values);
    table.setCreatingRow(null);
  };

  const handleSaveEntity = async ({ values, table }) => {
    const newValidationErrors = validateEntity(values);
    if (Object.values(newValidationErrors).some(Boolean)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    await updateEntity.mutateAsync(values);
    table.setEditingRow(null);
  };

  const openDeleteConfirmModal = (row) => {
    setCurrentRow(row);
    setDeleteAlertOpen(true);
  };

  const confirmDelete = async () => {
    setAlertLoad(true);
    if (currentRow) {
      await deleteEntity.mutateAsync(currentRow.original.id);
    }
    setAlertLoad(false);
    setDeleteAlertOpen(false);
    setCurrentRow(null);

    setLoading(true);
    updatedData(JSON.parse(sessionStorage.getItem(ENDPOINT)));
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
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle>Create New {entityType}</DialogTitle>
        <DialogContent>{internalEditComponents}</DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle>Edit {entityType}</DialogTitle>
        <DialogContent>{internalEditComponents}</DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        {loading && <Spinner />}
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
        msg="Do you want to delete this item?"
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
