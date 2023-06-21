import React, { useState } from "react";
import logo from "./mom.png";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import {
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import { Settings } from "lucide-react";

function Header({ user, onLogout }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    fetch("/logout", {
      method: "DELETE",
    })
      .then((res) => console.log(res))
      .then(() => onLogout);
  };
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  return (
    <div
      style={{
        backgroundImage:
          "url(https://template66395.motopreview.com/mt-demo/66300/66395/mt-content/uploads/2018/04/mt-1429-content-bg-1.jpg)",
        backgroundPosition: "left top",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className={"2xl:h-[1000px] text-white font-raleway "}
    >
      <div className={"flex justify-between max-w-6xl m-auto items-center"}>
        <img src={logo} alt="logo" className="h-60" />
        <div className="flex space-x-10 font-semibold">
          <Link to="/about">ABOUT ME</Link>
          <Link to="/services">SERVICES</Link>
          <Link to="/gallery">GALLERY</Link>
          <Link to="/pricing">PRICING</Link>
          <Link to="/testimonials">TESTIMONIALS</Link>
          <Link to="/contact">CONTACT ME</Link>
        </div>
        {user ? (
          <>
            <div className="cursor-pointer">
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar
                    style={{ height: 56, width: 56 }}
                    {...stringAvatar(`${user.username}`)}
                  />
                </IconButton>
              </Tooltip>
            </div>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {" "}
              <MenuItem>
                <Typography variant="h6" component="h2">
                  Welcome {user.username}!
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                component={Link}
                to={`/profile/${user.id}`}
              >
                <Avatar /> Profile
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose} component={Link} to={"/settings"}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogout} component={Link} to={"/login"}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
        )}
      </div>

      <div className="max-w-6xl m-auto mt-32">
        <h1 className="font-extrabold text-6xl max-w-2xl leading-normal">
          Magnificent, Natural Looking Lashes
        </h1>
        <h1 className="font-light text-5xl italic mt-3 mb-14">
          for Your Beautiful Eyes
        </h1>
        <Button variant="contained" color="secondary" size="large">
          BOOK AN APPOINTMENT
        </Button>
      </div>
    </div>
  );
}

export default Header;
