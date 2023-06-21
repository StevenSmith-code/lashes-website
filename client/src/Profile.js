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
  const user = useContext(UserContext);
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
        <div>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Welcome {username}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <List>
              <ListItem>
                <ListItemButton onClick={() => handleItemClick("profile")}>
                  <ListItemText primary="Profile Information" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => handleItemClick("appointments")}>
                  <ListItemText primary="My Appointments" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => handleItemClick("delete")}>
                  <ListItemText primary="Delete Account" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </div>
        <div>
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
