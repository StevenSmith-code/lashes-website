import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";
import { useEffect, useState } from "react";
import SignUp from "./SignUp";
import UserContext from "./UserProvider";
import AppointmentForm from "./AppointmentForm";
import AppointmentDetails from "./AppointmentDetails";
import NavBar from "./NavBar";

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const isRootRoute = location.pathname === "/";
  useEffect(() => {
    fetch("/user")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Failed to fetch user data");
      })
      .then((user) => setUser(user))
      .catch((error) => {
        console.error(error);
        setUser(null);
      });
  }, []);

  function handleLogin(user) {
    setUser(user);
  }

  function handleUpdate(user) {
    setUser(user);
  }

  function handleLogout() {
    setUser(null);
  }

  return (
    <div className="h-screen">
      <UserContext.Provider value={[user, setUser]}>
        {!isRootRoute && <NavBar />}
        <Routes>
          <Route path="/" element={<Home onLogout={handleLogout} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/profile/:id"
            element={<Profile onUpdate={handleUpdate} />}
          />
          <Route path="/signup" element={<SignUp onLogin={handleLogin} />} />
          <Route path="/book" element={<AppointmentForm />} />
          <Route path="/appointments/:id" element={<AppointmentDetails />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
