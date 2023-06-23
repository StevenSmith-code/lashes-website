import FormControl from "@mui/joy/FormControl/FormControl";
import {
  Button,
  FormHelperText,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserProvider";

function ProfileComponent({ onUpdate }) {
  const [user, setUser] = useContext(UserContext);
  const { username, email, id } = user;
  const nameParts = username.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts[1];
  const [first, setFirst] = useState(`${firstName}`);
  const [last, setLast] = useState(`${lastName}`);
  const [newEmail, setNewEmail] = useState(`${email}`);
  const [newPass, setNewPass] = useState("");
  const [currentPass, setCurrentPass] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  function handleSubmit() {
    const formData = {
      id: id,
      username: `${first} ${last}`,
      email: newEmail,
      currentPassword: currentPass,
      password: newPass,
    };
    console.log(formData);
    fetch(`/profile/${id}`, {
      method: "PATCH",
      body: JSON.stringify(formData),
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        onUpdate(formData);
        navigate("/");
      } else {
        res.json().then((errors) => setErrors(errors));
      }
    });
  }

  return (
    <div>
      <div className="mb-10">
        <Typography variant="h4">EDIT INFORMATION</Typography>
      </div>
      <FormControl sx={{ width: "50ch", display: "grid", gap: "1rem" }}>
        <FormHelperText sx={{ fontSize: "1rem" }}>First Name</FormHelperText>
        <OutlinedInput
          placeholder={firstName}
          value={first}
          onChange={(e) => setFirst(e.target.value)}
        />
        <FormHelperText sx={{ fontSize: "1rem" }}>Last Name</FormHelperText>
        <OutlinedInput
          placeholder={lastName}
          value={last}
          onChange={(e) => setLast(e.target.value)}
        />
        <FormHelperText sx={{ fontSize: "1rem" }}>Email</FormHelperText>
        <OutlinedInput
          placeholder={email}
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <FormHelperText sx={{ fontSize: "1rem" }}>
          Change Password or Enter Current Password to Update
        </FormHelperText>
        <TextField
          type="password"
          placeholder={"Current Password"}
          value={currentPass}
          onChange={(e) => setCurrentPass(e.target.value)}
        />

        <TextField
          type="password"
          placeholder={"New Password"}
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
        />

        {Object.values(errors).map((error, index) => (
          <p className="text-red-500" key={index}>
            {error}
          </p>
        ))}
        <Button onClick={handleSubmit} variant="outlined">
          Update
        </Button>
      </FormControl>
    </div>
  );
}

export default ProfileComponent;
