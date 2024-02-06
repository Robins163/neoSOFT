import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";

export const ConfirmationDialog = ({ open, handleDialogClose }) => (
  <Dialog open={open} onClose={() => handleDialogClose(false)}>
    <DialogTitle>Confirm Action</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure you want to move this item to the bin?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => handleDialogClose(false)}>Cancel</Button>
      <Button onClick={() => handleDialogClose(true)} autoFocus>
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
);
