import React from "react";
import ProfileComponent from "./ProfileComponent";
import AppointmentComponent from "./AppointmentComponent";
import DeleteComponent from "./DeleteComponent";

function ProfileContent({ menuItem, onUpdate }) {
  if (menuItem === "profile") {
    return <ProfileComponent onUpdate={onUpdate} />;
  }
  if (menuItem === "appointments") {
    return <AppointmentComponent onUpdate={onUpdate} />;
  }
  if (menuItem === "delete") {
    return <DeleteComponent onUpdate={onUpdate} />;
  }
}

export default ProfileContent;
