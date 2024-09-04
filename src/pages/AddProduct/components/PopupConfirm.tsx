import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";

export interface ConfirmDialogProps {
  open: boolean;
  onClose: (confirmed: boolean) => void;
  title: string;
  message: string;
}

function ConfirmDialog(props: ConfirmDialogProps) {
  const navigate = useNavigate();
  const { onClose, open, title, message } = props;

  const handleCancel = () => {
    onClose(false); // Close dialog without confirming
  };

  const handleConfirm = () => {
    onClose(true); // Confirm action and close dialog
    navigate("/products"); // Navigate to the products page
  };

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function ConfirmDialogButton() {
  const [open, setOpen] = React.useState(false);
  const [confirmed, setConfirmed] = React.useState<boolean | null>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (confirmed: boolean) => {
    setOpen(false);
    setConfirmed(confirmed);
  };

  return (
    <div className="m-0">
      <Box
        className="rounded-lg w-[50px] h-[50px] flex items-center justify-center border-[2px] border-solid border-gray-400 px-0"
        onClick={handleClickOpen}
      >
        <IconArrowLeft size={25} color="gray" />
      </Box>
      <ConfirmDialog
        open={open}
        onClose={handleClose}
        title="Confirm Action"
        message="Are you sure you want to return to the product list?"
      />
    </div>
  );
}
