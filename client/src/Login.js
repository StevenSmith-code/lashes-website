import React, { useEffect, useState } from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const formData = {
    email,
    password,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/login", {
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
        res.json().then((err) => setErrors(err.errors));
      }
    });
  };

  return (
    <div className="mt-20 bg-gray-300 max-w-6xl m-auto px-40 py-32 rounded-lg ">
      <div className=" text-center px-6  space-y-7">
        <form className="space-y-7" onSubmit={handleSubmit}>
          <div className="">
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
          </div>
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
          {errors?.map((err) => (
            <p className="text-red-600" key={err}>
              {err}
            </p>
          ))}
          <Button sx={{ mt: 1 /* margin top */ }} type="submit">
            Log in
          </Button>
        </form>
        <div className="flex justify-start space-x-4">
          <Typography fontSize="sm">Don't have an account?</Typography>
          <Link href="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
