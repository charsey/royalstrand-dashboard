import React from 'react';
import DashboardTab from './DashboardTab';

export const Dashboard = () => <DashboardTab />;

export const Customers = () => (
  <div className="center-wrap">
    <h2 className="text-2xl font-semibold">Customers</h2>
    <p className="text-sm text-gray-500">List of customers and details (placeholder).</p>
  </div>
);

export const Appointments = () => (
  <div className="center-wrap">
    <h2 className="text-2xl font-semibold">Appointments</h2>
    <p className="text-sm text-gray-500">Manage appointments and schedules.</p>
  </div>
);

export const Staff = () => (
  <div className="center-wrap">
    <h2 className="text-2xl font-semibold">Staff</h2>
    <p className="text-sm text-gray-500">Staff directory and roles.</p>
  </div>
);

export const Reports = () => (
  <div className="center-wrap">
    <h2 className="text-2xl font-semibold">Reports</h2>
    <p className="text-sm text-gray-500">Reports and analytics.</p>
  </div>
);

export const Settings = () => (
  <div className="center-wrap">
    <h2 className="text-2xl font-semibold">Settings</h2>
    <p className="text-sm text-gray-500">Application settings and preferences.</p>
  </div>
);

// no default export; pages are named exports
