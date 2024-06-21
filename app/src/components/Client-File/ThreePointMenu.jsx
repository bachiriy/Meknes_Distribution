import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import ConfirmAlert from '../Alerts/ConfirmAlert';
import PUT from '../../utils/PUT';
import GET from '../../utils/GET';
import PopupForm from './PopupForm';
import { Spinner } from 'flowbite-react';

const ITEM_HEIGHT = 48;

export default function ThreePointMenu({ id, updatedData }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [itemId, setItemId] = useState(id);
  const [alertLoad, setAlertLoad] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [fLoading, setFLoading] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [clientFileData, setClientFileData] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    const clientFiles = JSON.parse(sessionStorage.getItem('clientFiles') || '[]');
    const clientFile = clientFiles.clientFiles.find(file => file.id === itemId);
    
    if (clientFile) {
      setClientFileData(clientFile);
      setPopupOpen(true);
    } else {
      toast.error('Client file not found');
    }
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    setAlertLoad(true);
    try {
      const response = await PUT('clientFiles/softDelete', itemId, true);
      if (response.status === 'success') {
        toast.success(response.message);
        sessionStorage.removeItem('clientFiles');
        const updatedClientFiles = await GET('clientFiles');
        updatedData(updatedClientFiles.clientFiles);
      } else {
        toast.error('Error deleting client file');
      }
    } catch (error) {
      toast.error('Error deleting client file');
    } finally {
      setAlertLoad(false);
      setAlertOpen(false);
    }
    setAnchorEl(null);
  };

  if (fLoading) {
    return <Spinner />;
  }

  return (
    <div>
      {popupOpen && (
        <PopupForm
          open={popupOpen}
          setOpen={setPopupOpen}
          clientFileData={clientFileData}
          updatedData={updatedData}
        />
      )}

      <ConfirmAlert
        loading={alertLoad}
        msg="Voulez-vous supprimer ce Dossier Client ?"
        open={alertOpen}
        handleClose={() => setAlertOpen(false)}
        cancel={() => setAlertOpen(false)}
        confirm={handleDelete}
      />

      <div className='w-8'>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
      </div>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem onClick={handleEdit} disableRipple>
          <EditIcon />
          <p className='ml-2'>Modifier</p>
        </MenuItem>
        <MenuItem onClick={() => setAlertOpen(true)} disableRipple>
          <div className='text-red-600 flex'>
            <DeleteIcon />
            <p className='ml-2'>Supprimer</p>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
