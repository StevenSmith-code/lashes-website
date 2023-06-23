import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  MenuItem,
  TextField,
} from "@mui/material";
import Select from "@mui/material/Select";
import Typography from "@mui/joy/Typography";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { KeyboardArrowDown } from "@mui/icons-material";
import dayjs from "dayjs";
import { DesktopDatePicker, DesktopTimePicker } from "@mui/x-date-pickers";
import UserContext from "./UserProvider";
import { useNavigate } from "react-router-dom";

function AppointmentForm() {
  const user = useContext(UserContext);
  const [services, setServices] = useState([]);
  const [dropdownVal, setDropDownVal] = useState("");
  const [errors, setErrors] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(dayjs());
  const navigate = useNavigate();
  useEffect(() => {
    fetch("/services")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
  };

  const handleTimeChange = (newValue) => {
    setSelectedTime(newValue);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
      setErrors({ dateTime: "Date and Time are required" });
      return;
    }

    if (!dropdownVal) {
      setErrors({ service: "Service is required" });
      return;
    }

    const selectedService = services.find(
      (service) => service.name === dropdownVal
    );

    if (!selectedService) {
      setErrors({ service: "Invalid service selected" });
      return;
    }

    const formattedDateTime = dayjs(selectedDate)
      .set("hour", selectedTime.hour())
      .toISOString();
    const formData = {
      user_id: user.id,
      service_id: selectedService.id,
      start_time: formattedDateTime,
    };

    fetch("/appointments", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          navigate(`/profile/${user.id}`);
        });
      } else {
        res.json().then((err) => {
          const formattedErrors = Object.entries(err.errors || {}).map(
            ([field, errorMessages]) => ({
              field,
              messages: errorMessages,
            })
          );
          setErrors(formattedErrors);
        });
      }
    });
  };

  function servicePrice() {
    const selectedService = services.find(
      (service) => service.name === dropdownVal
    );

    if (selectedService) {
      return selectedService.price;
    } else {
      return "";
    }
  }

  return (
    <Container maxWidth="sm">
      <Box mt={4} p={4} boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)">
        <Typography variant="h5">Schedule Appointment</Typography>
        <form onSubmit={onSubmit}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                value={selectedDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
                minDate={dayjs().add(1, "day")}
              />
              <DesktopTimePicker
                value={selectedTime}
                onChange={handleTimeChange}
                views={["hours"]}
                ampm
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <Select
              label="Service"
              IconComponent={KeyboardArrowDown}
              value={dropdownVal}
              onChange={(e) => setDropDownVal(e.target.value)}
              error={!!errors.service}
            >
              <MenuItem value="">Select a service</MenuItem>
              {services.map((service) => (
                <MenuItem key={service.id} value={service.name}>
                  {service.name}
                </MenuItem>
              ))}
            </Select>
            {errors.service && (
              <FormHelperText error>{errors.service}</FormHelperText>
            )}
          </FormControl>

          <Typography
            fontSize="xl4"
            lineHeight={1}
            startDecorator={
              <Typography
                fontSize="lg"
                textColor="text.secondary"
                component="span"
                marginBottom={5}
              >
                $
              </Typography>
            }
            sx={{ alignItems: "flex-start" }}
          >
            {servicePrice()}
          </Typography>

          {Array.isArray(errors) &&
            errors.map((error) => (
              <div className="text-red-600" key={error.field}>
                <p>{error.field}</p>
                <ul>
                  {error.messages.map((message, index) => (
                    <li key={index}>{message}</li>
                  ))}
                </ul>
              </div>
            ))}

          <Button variant="contained" type="submit">
            Schedule Appointment
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default AppointmentForm;
