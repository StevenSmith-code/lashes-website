import React, { useContext, useState } from "react";
import UserContext from "./UserProvider";
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function DeleteComponent() {
  const [user, setUser] = useContext(UserContext);
  const [open, setOpen] = useState(false); // State for controlling the dialog
  const navigate = useNavigate();
  function handleDelete() {
    fetch(`/users/${user.id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        navigate("/");
      }
    });
    setUser(null);
  }

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <div className="flex flex-col items-center">
      <Typography variant="h4">Delete Account</Typography>
      <Typography sx={{ marginTop: 5, marginBottom: 5 }} variant="body1">
        Are you sure you want to delete your account?
      </Typography>
      <Button variant="outlined" color="error" onClick={handleOpenDialog}>
        DELETE
      </Button>

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Account Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            This will cancel all appointments and delete your account
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteComponent;
