import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";

function AppointmentCard({ service, created, startTime }) {
  function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const formattedDate = dateTime.toLocaleDateString(); // Format the date portion
    const formattedTime = dateTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }); // Format the time portion

    return `${formattedDate} at ${formattedTime}`;
  }

  const formattedStartTime = formatDateTime(startTime);
  const formattedCreated = formatDateTime(created);

  return (
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
      </CardContent>
    </Card>
  );
}

export default AppointmentCard;
