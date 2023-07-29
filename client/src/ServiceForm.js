import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ServiceForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const handleChange = (event) => {
    const { name, value } = event.target;

    // Validate if the value is an integer before updating the state
    if (name === "price" && value !== "" && !Number.isInteger(Number(value))) {
      return; // Do not update state if the price is not a valid integer
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => setMessage("Form submitted sucessfully"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="service-name"
        label="Service Name"
        variant="outlined"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <TextField
        id="service-description"
        label="Service Description"
        variant="outlined"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      <TextField
        id="service-price"
        label="Service Price"
        variant="outlined"
        placeholder="Price in decimal format"
        name="price"
        value={formData.price}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
      {message && <p>message</p>}
    </form>
  );
}

export default ServiceForm;
