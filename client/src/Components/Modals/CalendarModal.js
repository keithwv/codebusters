import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AddEventForm from "../Schedule/AddEventForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CalendarModal(props) {
  const {
    addEvent,
    method,
    selectedBusiness,
    servicesProvided: services,
    setServicesProvided,
  } = props;

  // const handleClose = () => {
  //     data.check = false
  //     console.log("closing modal")
  // }
  const [open, setOpen] = React.useState(true);
  //const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

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
          <AddEventForm
            setServicesProvided={setServicesProvided}
            servicesProvided={services}
            addEvent={addEvent}
            selectedBusiness={selectedBusiness}
            method={method}
          />
        </Box>
      </Modal>
    </div>
  );
}
