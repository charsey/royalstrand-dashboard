import React, { useState, useRef, useEffect } from 'react';
// Inline SVG icons (small, dependency-free)
const Bars3Icon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const BellIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Small helper hook to close on outside click
function useOutsideAlerter(ref, handler) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handler]);
}

export default function Navbar({ onToggleSidebar }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [theme, setTheme] = useState(() => document.documentElement.classList.contains('dark') ? 'dark' : 'light');

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useOutsideAlerter(notifRef, () => setNotifOpen(false));
  useOutsideAlerter(profileRef, () => setProfileOpen(false));

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const notifications = [
    { id: 1, text: 'New user signed up', time: '2m' },
    { id: 2, text: 'Server CPU at 72%', time: '10m' },
    { id: 3, text: 'Payment received', time: '1h' },
  ];

  return (
    <nav className="rs-navbar" role="navigation" aria-label="Main navigation">
      <div className="rs-container">
          <div className="rs-left">
          <button aria-label="Toggle sidebar" onClick={onToggleSidebar} className="icon-btn sidebar-btn mobile-toggle">
            <Bars3Icon className="icon-svg" />
          </button>
          <div className="rs-logo-wrap">
            {/* <img className="rs-logo" src="" alt="Logo" /> */}
            <span className="rs-brand">RoyalStrand</span>
          </div>
          </div>

          {/* center search */}
          <div className="rs-center">
            <div className="rs-search-wrap">
              <input aria-label="Search" type="text" placeholder="Search for reports, users, or settings..." className="rs-search-input" />
            </div>
          </div>

          <div className="rs-actions">
          <div className="rs-notif" ref={notifRef}>
            <button aria-label="Notifications" onClick={() => setNotifOpen(v => !v)} className="icon-btn">
              <BellIcon className="icon-svg"  />
              <span className="notif-badge">3</span>
            </button>
            <div className={`dropdown ${notifOpen ? 'open' : ''}`} role="menu" aria-label="Notifications list">
              <div className="dropdown-title">Notifications</div>
              <div className="dropdown-list">
                {notifications.map(n => (
                  <div key={n.id} className="dropdown-item">
                    <div className="dropdown-item-text">{n.text}</div>
                    <div className="dropdown-item-time">{n.time}</div>
                  </div>
                ))}
              </div>
              <div className="dropdown-footer"><button className="link-btn">View all</button></div>
            </div>
          </div>

          <div className="rs-profile" ref={profileRef}>
            <div className="profile-anchor">
              <button aria-label="Open profile menu" onClick={() => setProfileOpen(v => !v)} className="profile-btn">
                <img className="profile-img" src="https://i.pravatar.cc/150?u=johndoe" alt="John Doe" />
              </button>
              <div className={`dropdown small ${profileOpen ? 'open' : ''}`} role="menu" aria-label="Profile menu">
                <button className="dropdown-action">Settings</button>
                <button className="dropdown-action">Logout</button>
                <div className="dropdown-divider" />
                <div className="dropdown-theme">
                  <span>Theme</span>
                  <div className="theme-actions">
                    <button onClick={() => setTheme('light')} className="theme-btn">Light</button>
                    <button onClick={() => setTheme('dark')} className="theme-btn">Dark</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-meta">
              <div className="profile-name">John Doe</div>
              <div className="profile-role">Super Admin</div>
            </div>
          </div>

          {/* removed right-side hamburger toggle on mobile per request */}
        </div>
      </div>
      
    </nav>
  );
}
