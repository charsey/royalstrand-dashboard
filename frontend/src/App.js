import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DashboardTab from './components/DashboardTab';
import React, { useState } from 'react';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-64 content-with-navbar">
        <Navbar onToggleSidebar={() => setSidebarOpen(s => !s)} />
        <main className="p-6">
          <div className="center-wrap">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">Main content placeholder.</p>
            <div className="mt-6">
              {/* Dashboard content component */}
              <DashboardTab />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
