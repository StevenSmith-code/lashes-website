import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import { useEffect, useState } from "react";
function App() {
  const [user, setUser] = useState(null);
  function handleLogin(user) {
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
    <div className="h-screen flex flex-col">
      <Routes>
        <Route
          path="/"
          element={<Home user={user} onLogout={handleLogout} />}
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </div>
  );
}

export default App;
