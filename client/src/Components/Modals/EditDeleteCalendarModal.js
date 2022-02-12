import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import EditDeleteEventForm from '../Schedule/Edit_Delete_EventForm';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function EditDeleteCalendarModal(props) {
    const { data, method }= props  
    

   
    const [open, setOpen] = React.useState(true);
    //const handleOpen = () => setOpen(true);
    //  const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal
                open={open}
                onClose={method}
                onBackdropClick={method}
                 aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <EditDeleteEventForm  data={data} method={method} />
                </Box>
            </Modal>
        </div>
    );
}