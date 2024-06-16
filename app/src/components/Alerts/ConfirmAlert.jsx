import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

export default function ConfirmAlert({ loading, open, handleClose, confirm, cancel, msg }) {
    //   const [open, setOpen] = React.useState(false);

    //   const handleClickOpen = () => {
    //     setOpen(true);
    //   };

    //   const handleClose = () => {
    //     setOpen(false);
    //   };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >

                <DialogContent>
                    <DialogContentText>
                        {msg}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={cancel}>Annuler</Button>
                    {loading ? (
                        <Button disabled onClick={confirm}>Loading... </Button>
                    ) : (
                        <Button onClick={confirm}>Confirmer</Button>
                    )}
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
