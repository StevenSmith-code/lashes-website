import React, { useContext, useState } from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserProvider";

function SignUp({ onLogin }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  const formData = {
    username: `${firstName} ${lastName}`,
    email,
    password,
    password_confirmation: passwordConfirmation,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          onLogin(user);
          navigate("/");
        });
      } else {
        res.json().then((err) => {
          const formattedErrors = Object.entries(err.errors).map(
            ([field, errorMessages]) => ({
              field,
              messages: errorMessages,
            })
          );
          setErrors(formattedErrors);
        });

        setPassword("");
      }
    });
  };
  return (
    <div className="mt-20 bg-gray-300 max-w-6xl m-auto px-40 py-32 rounded-lg ">
      {user ? (
        navigate("/")
      ) : (
        <div className=" text-center px-6  space-y-7">
          <form className="space-y-7" onSubmit={handleSubmit}>
            <div className="">
              <Grid container spacing={1} columns={3}>
                <Grid item spacing={3}>
                  <FormControl>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      name="lastname"
                      type="text"
                      placeholder="Enter your First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item spacing={3}>
                  <FormControl>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      name="lastname"
                      type="text"
                      placeholder="Enter your Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item spacing={3}>
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                      name="email"
                      type="text"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item spacing={3}>
                  <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item spacing={3}>
                  <FormControl>
                    <FormLabel>Password Confirmation</FormLabel>
                    <Input
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      value={passwordConfirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Button sx={{ mt: 1 /* margin top */ }} type="submit">
                Sign up
              </Button>
            </div>
            <div className="flex justify-between">
              {errors.map((error) => (
                <div className="text-red-600" key={error.field}>
                  <p>{error.field}</p>
                  <ul>
                    {error.messages.map((message, index) => (
                      <li key={index}>{message}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default SignUp;
