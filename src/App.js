import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Schedule from "./pages/Schedule";
import Booking from "./pages/Booking";
import BrahmsFinder from "./pages/BrahmsFinder";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/brahms-finder" element={<BrahmsFinder />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
