import React, { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
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
import Option from "@mui/joy/Option";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { KeyboardArrowDown } from "@mui/icons-material";

function AppointmentForm() {
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [dropdownVal, setDropDownVal] = useState("");
  const [errors, setErrors] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();

    if (!selectedDateTime) {
      setErrors({ dateTime: "Date and Time is required" });
      return;
    }

    if (!dropdownVal) {
      setErrors({ service: "Service is required" });
      return;
    }

    const formattedDateTime = selectedDateTime.toISOString();
    const data = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      dateTime: formattedDateTime,
      service: dropdownVal,
    };

    console.log(data); // Do something with the formatted date and time
  };

  function servicePrice() {
    switch (dropdownVal) {
      case "Volume Lashes":
        return "200";
      case "Classic Lashes":
        return "175";
      case "Brow Extensions":
        return "190";
      default:
        return "";
    }
  }

  return (
    <Container maxWidth="sm">
      <Box mt={4} p={4} boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)">
        <Typography variant="h5">Schedule Appointment</Typography>
        <form onSubmit={onSubmit}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="First Name"
              name="firstName"
              required
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Last Name"
              name="lastName"
              required
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Email"
              name="email"
              required
              error={!!errors.email}
              helperText={errors.email}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                renderInput={(props) => (
                  <TextField
                    {...props}
                    label="Date and Time"
                    error={!!errors.dateTime}
                    helperText={errors.dateTime}
                  />
                )}
                value={selectedDateTime}
                onChange={(newValue) => setSelectedDateTime(newValue)}
                openTo="day"
                views={["month", "day", "hours", "minutes"]}
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
              <MenuItem value="Volume Lashes">Volume Lashes</MenuItem>
              <MenuItem value="Classic Lashes">Classic Lashes</MenuItem>
              <MenuItem value="Brow Extensions">Brow Extensions</MenuItem>
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

          <Button variant="contained" type="submit">
            Schedule Appointment
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default AppointmentForm;
