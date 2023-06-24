import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "./UserProvider";
import { Typography, Button, TextField } from "@mui/material";
import {
  DesktopDatePicker,
  DesktopTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function AppointmentDetails() {
  const [user, setUser] = useContext(UserContext);
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(dayjs());
  const [timeError, setTimeError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const formattedDateTime = dayjs(selectedDate)
    .set("hour", selectedTime.hour())
    .toISOString();

  useEffect(() => {
    const selectedAppointment = user.appointments?.find(
      (appointment) => appointment.id === parseInt(id)
    );

    setAppointment(selectedAppointment);
  }, [id, user]);

  useEffect(() => {
    fetch("/services")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
    if (newValue.isBefore(dayjs().add(1, "day"))) {
      setDateError(true);
    } else {
      setDateError(false);
    }
  };

  const handleTimeChange = (newValue) => {
    setSelectedTime(newValue);
    if (
      newValue.isBefore(dayjs().hour(11)) ||
      newValue.isAfter(dayjs().hour(18))
    ) {
      setTimeError(true);
    } else {
      setTimeError(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedDate || !selectedTime) {
      setErrors({ dateTime: "Date and Time are required" });
      return;
    }

    if (!selectedService) {
      setErrors({ service: "Service is required" });
      return;
    }

    const selectedServiceObj = services.find(
      (service) => service.name === selectedService
    );

    if (!selectedServiceObj) {
      setErrors({ service: "Invalid service selected" });
      return;
    }

    const formData = {
      id: id,
      start_time: formattedDateTime,
      service_id: selectedServiceObj.id,
    };

    fetch(`/appointments/${id}`, {
      method: "PATCH",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) =>
      res.json().then((data) => {
        console.log(data);
        const updatedAppointment = {
          id: data.id,
          created_at: data.created_at,
          start_time: data.start_time,
          service: {
            title: data.service.name,
            price: data.service.price,
          },
        };

        setUser((prevUser) => {
          const updatedAppointments = prevUser.appointments.map((appointment) =>
            appointment.id === updatedAppointment.id
              ? updatedAppointment
              : appointment
          );

          return {
            ...prevUser,
            appointments: updatedAppointments,
          };
        });
        navigate(`/profile/${user.id}`);
      })
    );
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow">
      {appointment ? (
        <div>
          <Typography variant="h4" className="mb-4">
            Appointment Details
          </Typography>
          {appointment.service ? (
            <Typography variant="h6" className="mb-2">
              Service: {appointment.service.title}
            </Typography>
          ) : null}
          <Typography variant="h6">
            Start Time: {new Date(appointment.start_time).toLocaleString()}
          </Typography>

          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
              <label htmlFor="service" className="block mb-1">
                Select Service:
              </label>
              <select
                id="service"
                value={selectedService}
                onChange={handleServiceChange}
                className="border rounded py-1 px-2 w-full"
              >
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service.id} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </select>
              {errors.service && (
                <p className="text-red-500 mt-1">{errors.service}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="time" className="block mb-1">
                Select Time:
              </label>
              {errors.dateTime && (
                <p className="text-red-500 mt-1">{errors.dateTime}</p>
              )}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  value={selectedDate}
                  onChange={handleDateChange}
                  slotProps={{ textField: { variant: "outlined" } }}
                  minDate={dayjs().add(1, "day")}
                />
                <DesktopTimePicker
                  value={selectedTime}
                  onChange={handleTimeChange}
                  views={["hours"]}
                  ampm
                  slotProps={{ textField: { variant: "outlined" } }}
                  minTime={dayjs().hour(11)}
                  maxTime={dayjs().hour(18)}
                  error={timeError}
                  helperText={timeError ? "Invalid time" : ""}
                  closeOnSelect={false}
                />
              </LocalizationProvider>
            </div>

            <Button variant="contained" type="submit">
              Update Appointment
            </Button>
          </form>
        </div>
      ) : (
        <Typography variant="h6" className="text-red-600">
          Appointment not found.
        </Typography>
      )}
    </div>
  );
}

export default AppointmentDetails;
