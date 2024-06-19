import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmAlert from '../Alerts/ConfirmAlert';
import PUT from '../../utils/PUT';
import DELETE from '../../utils/DELETE';

const options = [
  ['Modifier', <EditIcon />, 'black'],
  ['Supprimer', <DeleteIcon />, 'red']
];

const ITEM_HEIGHT = 48;

export default function ThreePointMenu({id}) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [itemId, setItemId] = React.useState(id);
  const [alertLoad, setAlertLoad] = React.useState(false);
  const [AlertOpen, setAlertOpen] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); 
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  const confirmDelete = () => {

  }


  const handleDelete = async () => {
    setAlertLoad(true)
    console.log(itemId);
    let r = await DELETE('clientFiles', itemId);


    setAnchorEl(null)
    setAlertLoad(false);
    setAlertOpen(false)
  }


  const handleEdit = () => {
    console.log('edit');
  }

  return (
    <div>
      <ConfirmAlert
        loading={alertLoad}
        msg="voulez-vous supprimer cette Dossier Client ?"
        open={AlertOpen}
        handleClose={() => alertLoad ? setAlertOpen(true) : setAlertOpen(false)}
        cancel={() => {
          setAlertOpen(false);
        }}
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
