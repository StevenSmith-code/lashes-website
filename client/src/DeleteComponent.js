import React, { useContext } from "react";
import UserContext from "./UserProvider";

function DeleteComponent() {
  const user = useContext(UserContext);
  return <div>DeleteComponent</div>;
}

export default DeleteComponent;
