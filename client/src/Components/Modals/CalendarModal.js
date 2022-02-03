import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CalendarForm from '../Schedule/calendarform';



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

export default function CalendarModal(props) {
    const { data, method }= props  
    

    // const handleClose = () => {
    //     data.check = false
    //     console.log("closing modal")
    // }
    const [open, setOpen] = React.useState(true);
    //const handleOpen = () => setOpen(true);
     const handleClose = () => setOpen(false);

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
                <CalendarForm data={data} method={method} />
                </Box>
            </Modal>
        </div>
    );
}