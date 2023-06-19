import React, { useState } from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import { Typography } from "@mui/material";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the username and password values
    console.log("Username:", username);
    console.log("Password:", password);
    // Reset the form
    setUsername("");
    setPassword("");
  };

  return (
    <div className="my-auto bg-gray-300 max-w-6xl m-auto px-40 py-32 rounded-lg ">
      <div className="text-center px-6  space-y-7">
        <form className="space-y-7" onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              name="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
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
          <Button sx={{ mt: 1 /* margin top */ }} type="submit">
            Log in
          </Button>
        </form>
        <div className="flex justify-between space-x-4">
          <Typography fontSize="sm">Don't have an account?</Typography>
          <Link href="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
