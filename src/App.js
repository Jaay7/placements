import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/auths/Signup';
import Login from './components/auths/Login';
import Home from './components/dashboard/Home';
import Dashboard from './components/dashboard/Dashboard';
import RegisteredJobs from './components/dashboard/RegisteredJobs';
import StudentDetails from './components/dashboard/StudentDetails';
import Profile from './components/dashboard/Profile';
import LandingPage from './components/dashboard/LandingPage';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/" element={<Dashboard />}>
            <Route path="/home" element={<Home />} />
            <Route path="/my-jobs" element={<RegisteredJobs />} />
            <Route path="/my-details" element={<StudentDetails />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
