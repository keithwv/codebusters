import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import BookEventForm from "../Schedule/BookEventForm";

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

export default function BookingModal(props) {
  const {
    bookEvents,
    method,
    user
  } = props;
  console.log("Booking modal is Open")
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
          <BookEventForm
            bookEvents={bookEvents}
            method={method}
            user={user}
          />
        </Box>
      </Modal>
    </div>
  );
}
