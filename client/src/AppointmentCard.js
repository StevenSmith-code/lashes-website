import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate } from "react-router-dom";
function AppointmentCard({ id, service, created, startTime }) {
  function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const formattedDate = dateTime.toLocaleDateString(); // Format the date portion
    const formattedTime = dateTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }); // Format the time portion

    return `${formattedDate} at ${formattedTime}`;
  }

  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  function handleDialog() {
    setOpenDialog(true);
  }

  function handleCancel() {
    fetch(`/appointment/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        navigate("/");
      }
    });
    setOpenDialog(false);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  const formattedStartTime = formatDateTime(startTime);
  const formattedCreated = formatDateTime(created);

  return (
    <>
      <Card
        sx={{ maxWidth: 345, marginBottom: "1em", mr: "20px" }}
        variant="outlined"
      >
        <CardHeader title={service} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <strong>Appointment starts on:</strong> {formattedStartTime}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Appointment booked on:</strong> {formattedCreated}
          </Typography>
          <div className="text-right cursor-pointer">
            <DeleteOutlineIcon onClick={handleDialog} />
          </div>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Cancel Appointment</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to cancel this appointment?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>No</Button>
          <Button onClick={handleCancel} variant="contained" color="error">
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AppointmentCard;
