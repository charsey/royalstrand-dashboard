import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { startLoading } from './TopProgress';

const Icon = ({ name, className = 'icon-svg' }) => {
  const size = '20';
  switch (name) {
    case 'dashboard':
      return (<svg className={className} viewBox="0 0 24 24" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden><path d="M3 13h8V3H3v10zM13 21h8V11h-8v10zM13 3v8h8V3h-8zM3 21h8v-6H3v6z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
    case 'customers':
      return (<svg className={className} viewBox="0 0 24 24" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden><path d="M16 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM6 11c1.657 0 3-1.343 3-3S7.657 5 6 5 3 6.343 3 8s1.343 3 3 3zM6 13c-3 0-5 1.5-5 3v1h16v-1c0-1.5-2-3-5-3H6z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
    case 'appointments':
      return (<svg className={className} viewBox="0 0 24 24" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden><rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M16 3v4M8 3v4M3 11h18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
    case 'staff':
      return (<svg className={className} viewBox="0 0 24 24" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden><path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zM6 20v-1c0-2.21 3.582-4 6-4s6 1.79 6 4v1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
    case 'reports':
      return (<svg className={className} viewBox="0 0 24 24" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden><path d="M3 3h18v18H3z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 7h10M7 11h10M7 15h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
    case 'settings':
      return (<svg className={className} viewBox="0 0 24 24" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden><path d="M12 15.5A3.5 3.5 0 1112 8.5a3.5 3.5 0 010 7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06A2 2 0 014.27 16.9l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82L4.27 4.27A2 2 0 017.1 1.44l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001 1.51V3a2 2 0 014 0v.09c.16.5.53.89 1 1.51h.02c.67.54 1.56.64 2.33.28l.06-.03a2 2 0 012.83 2.83l-.06.06c-.31.31-.43.74-.33 1.14v.02c.16.5.53.89 1 1.51H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
    default:
      return null;
  }
};

export default function Sidebar({ open = false, onClose = () => {} }) {

  useEffect(() => {
    // lock body scroll when sidebar open on small screens
    if (open && window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const items = [
    { key: 'dashboard', label: 'Dashboard', icon: <Icon name="dashboard" /> },
    { key: 'customers', label: 'Customers', icon: <Icon name="customers" /> },
    { key: 'appointments', label: 'Appointments', icon: <Icon name="appointments" /> },
    { key: 'staff', label: 'Staff', icon: <Icon name="staff" /> },
    { key: 'reports', label: 'Reports', icon: <Icon name="reports" /> },
    { key: 'settings', label: 'Settings', icon: <Icon name="settings" /> },
  ];

  return (
    <>
      <aside className={`sidebar ${open ? 'open' : 'closed'}`} aria-hidden={!open} aria-label="Sidebar navigation">
        <div className="sidebar-inner">
          <div className="sidebar-header">
            <div className="logo-box">RS</div>
            <div className="sidebar-title">
              <div className="text-lg font-semibold">RoyalStrand</div>
              <div className="text-xs text-gray-500">Dashboard</div>
            </div>
          </div>

          <nav className="mt-6" aria-label="Main">
            <ul className="sidebar-list">
              {items.map(it => (
                <li key={it.key}>
                  <NavLink
                    to={`/${it.key === 'dashboard' ? '' : it.key}`}
                    className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                    onClick={() => { startLoading(); if (window.innerWidth < 1024) onClose(); }}
                  >
                    <span className="sidebar-icon">{it.icon}</span>
                    <span className="sidebar-label">{it.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto pt-4 border-t border-gray-100 dark:dark\:border-gray-700">
            <button className="w-full text-sm text-gray-700 dark:text-gray-200 text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">Help & Support</button>
          </div>
        </div>
      </aside>

      {/* backdrop on mobile when open */}
      <div className={`sidebar-backdrop ${open ? 'visible' : ''}`} onClick={onClose} aria-hidden />
    </>
  );
}
