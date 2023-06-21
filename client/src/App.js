import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";
import { useEffect, useState } from "react";
import SignUp from "./SignUp";
function App() {
  const [user, setUser] = useState(null);
  function handleLogin(user) {
    setUser(user);
  }
  function handleUpdate(user) {
    setUser(user);
  }
  function handleLogout(user) {
    setUser(null);
  }

  useEffect(() => {
    fetch("/user").then((res) => {
      if (res.ok) {
        res.json().then((user) => setUser(user));
      }
    });
  }, []);
  return (
    <div className="h-screen">
      <Routes>
        <Route
          path="/"
          element={<Home user={user} onLogout={handleLogout} />}
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/profile/:id"
          element={<Profile user={user} onUpdate={handleUpdate} />}
        />
        <Route path="/signup" element={<SignUp onLogin={handleLogin} />} />
      </Routes>
    </div>
  );
}

export default App;
