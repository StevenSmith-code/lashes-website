import { Typography } from "@mui/material";
import React, { useContext } from "react";
import AppointmentCard from "./AppointmentCard";
import UserContext from "./UserProvider";

function AppointmentComponent({ onUpdate }) {
  const user = useContext(UserContext);
  return (
    <div>
      <Typography variant="h4">Appointments for {user.username}</Typography>

      <div className="flex mt-10">
        {user.appointments?.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            id={appointment.id}
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
