import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Dashboard, Customers, Appointments, Staff, Reports, Settings } from './components/Pages';
import TopProgress, { finishLoading } from './components/TopProgress';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <BrowserRouter>
      <RouteWatcher />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <TopProgress />
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="lg:pl-64 content-with-navbar">
          <Navbar onToggleSidebar={() => setSidebarOpen(s => !s)} />
          <main className="p-6">
            <div className="center-wrap">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/staff" element={<Staff />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

function RouteWatcher() {
  // calls finishLoading whenever the location changes so the top progress completes
  const location = useLocation();
  useEffect(() => {
    // small timeout to allow transitions; finish immediately is fine too
    finishLoading();
  }, [location]);
  return null;
}
