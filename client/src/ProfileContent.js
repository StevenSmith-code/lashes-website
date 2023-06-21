import React from "react";
import ProfileComponent from "./ProfileComponent";
import AppointmentComponent from "./AppointmentComponent";
import DeleteComponent from "./DeleteComponent";

function ProfileContent({ menuItem, user, onUpdate }) {
  if (menuItem === "profile") {
    return <ProfileComponent user={user} onUpdate={onUpdate} />;
  }
  if (menuItem === "appointments") {
    return <AppointmentComponent user={user} onUpdate={onUpdate} />;
  }
  if (menuItem === "delete") {
    return <DeleteComponent user={user} onUpdate={onUpdate} />;
  }
}

export default ProfileContent;
