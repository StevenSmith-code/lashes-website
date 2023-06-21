import { Typography } from "@mui/material";
import React from "react";
import AppointmentCard from "./AppointmentCard";

function AppointmentComponent({ user, onUpdate }) {
  console.log(user);
  return (
    <div>
      <Typography variant="h4">Appointments for {user.username}</Typography>

      <div className="flex mt-10">
        {user.appointments?.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            service={appointment.service.title}
            created={appointment.created_at}
            startTime={appointment.start_time}
          />
        ))}
      </div>
    </div>
  );
}

export default AppointmentComponent;
