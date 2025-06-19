// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage';
import ScreenTimeEffect from './pages/ScreenTimeEffect';
import DiseasePrediction from './pages/DiseasePrediction';
import HealthBot from './pages/HealthBot';

export default function App() {
  return (
    <div className='bg-white dark:bg-black'>

      <Router>
        <Navbar />
        <div className="">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/disease-prediction" element={<DiseasePrediction />} />
            <Route path="/screen-time-effect" element={<ScreenTimeEffect />} />
            <Route path="/ai-health-assistant" element={<HealthBot />} />
            <Route path="/contact" element={<h1>Contact Page</h1>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
