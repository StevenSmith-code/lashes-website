import { Typography } from "@mui/material";
import React, { useContext } from "react";
import AppointmentCard from "./AppointmentCard";
import UserContext from "./UserProvider";
import { useNavigate } from "react-router-dom";

function AppointmentComponent() {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div>
      <Typography variant="h4">Appointments for {user.username}</Typography>

      <div className="grid grid-cols-3 mt-10">
        {user.appointments?.map((appointment) => (
          <div
            key={appointment.id} // Add key prop with a unique identifier
            className="cursor-pointer hover:scale-110 transition duration-100"
            onClick={() => navigate(`/appointments/${appointment.id}`)}
          >
            <AppointmentCard
              key={appointment.id}
              id={appointment.id}
              service={appointment.service?.title}
              created={appointment.created_at}
              startTime={appointment.start_time}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AppointmentComponent;
