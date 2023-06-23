import React, { useContext, useState } from "react";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ProfileContent from "./ProfileContent";
import UserContext from "./UserProvider";

function Profile({ onUpdate }) {
  const [user, setUser] = useContext(UserContext);
  const [selectedMenuItem, setSelectedMenuItem] = useState("profile");

  const handleItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  if (!user) {
    // User object is null, display a loading message or redirect to a login page
    return <div>Loading profile...</div>;
  }

  const { username } = user;

  return (
    <div className="mt-24">
      <div className="flex justify-around max-w-7xl m-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Typography
            variant="h6"
            component="div"
            className="text-primary mb-4"
          >
            Welcome {username}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <List className="space-y-3">
              <ListItem>
                <ListItemButton
                  onClick={() => handleItemClick("profile")}
                  className={`rounded-lg px-4 py-2 ${
                    selectedMenuItem === "profile"
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  <ListItemText primary="Profile Information" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  onClick={() => handleItemClick("appointments")}
                  className={`rounded-lg px-4 py-2 ${
                    selectedMenuItem === "appointments"
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  <ListItemText primary="My Appointments" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  onClick={() => handleItemClick("delete")}
                  className={`rounded-lg px-4 py-2 ${
                    selectedMenuItem === "delete"
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  <ListItemText primary="Delete Account" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ProfileContent
            menuItem={selectedMenuItem}
            user={user}
            onUpdate={onUpdate}
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
