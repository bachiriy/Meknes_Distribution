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
import { useMutation, useQueryClient } from '@tanstack/react-query';

const Table = ({ columns, data, entityType, validateEntity }) => {
  const [validationErrors, setValidationErrors] = useState({});

  const memoizedColumns = useMemo(() => {
    return columns.map((col) => {
      if (col.required) {
        return {
          ...col,
          muiEditTextFieldProps: {
            required: true,
            error: !!validationErrors?.[col.accessorKey],
            helperText: validationErrors?.[col.accessorKey],
            onFocus: () =>
              setValidationErrors({
                ...validationErrors,
                [col.accessorKey]: undefined,
              }),
          },
        };
      }
      return col;
    });
  }, [columns, validationErrors]);

  const queryClient = useQueryClient();

  const createEntity = useMutation({
    mutationFn: async (entity) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.resolve();
    },
    onMutate: (newEntityInfo) => {
      queryClient.setQueryData([entityType], (prevEntities) => [
        ...prevEntities,
        {
          ...newEntityInfo,
          id: (Math.random() + 1).toString(36).substring(7),
        },
      ]);
    },
  });

  const updateEntity = useMutation({
    mutationFn: async (entity) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.resolve();
    },
    onMutate: (newEntityInfo) => {
      queryClient.setQueryData([entityType], (prevEntities) =>
        prevEntities?.map((prevEntity) =>
          prevEntity.id === newEntityInfo.id ? newEntityInfo : prevEntity
        )
      );
    },
  });

  const deleteEntity = useMutation({
    mutationFn: async (entityId) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.resolve();
    },
    onMutate: (entityId) => {
      queryClient.setQueryData([entityType], (prevEntities) =>
        prevEntities?.filter((entity) => entity.id !== entityId)
      );
    },
  });

  const handleCreateEntity = async ({ values, table }) => {
    const newValidationErrors = validateEntity(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createEntity.mutateAsync(values);
    table.setCreatingRow(null);
  };

  const handleSaveEntity = async ({ values, table }) => {
    const newValidationErrors = validateEntity(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateEntity.mutateAsync(values);
    table.setEditingRow(null);
  };

  const openDeleteConfirmModal = (row) => {
    if (window.confirm(`Are you sure you want to delete this ${entityType}?`)) {
      deleteEntity.mutateAsync(row.original.id);
    }
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
        <DialogTitle variant="h3">Create New {entityType}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Edit {entityType}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
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
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Create New {entityType}
      </Button>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default Table;
