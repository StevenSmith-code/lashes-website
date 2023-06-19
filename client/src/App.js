import { Route, Routes } from "react-router-dom";
import Home from "./Home";
function App() {
  return (
    <div className="h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
