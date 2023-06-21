import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ProfileContent from "./ProfileContent";
import { useNavigate } from "react-router-dom";

function Profile({ user, onUpdate }) {
  const { username } = user;
  const [selectedMenuItem, setSelectedMenuItem] = useState("profile");
  const navigate = useNavigate();

  const handleItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <div className="mt-24">
      {user && (
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
                  <ListItemButton
                    onClick={() => handleItemClick("appointments")}
                  >
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
      )}
    </div>
  );
}

export default Profile;
