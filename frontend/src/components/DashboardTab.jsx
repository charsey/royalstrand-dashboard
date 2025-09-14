import React, { useState } from 'react';
import { startLoading } from './TopProgress';

const Stat = ({ title, value, delta, icon }) => (
  <div className="card kpi-card">
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm text-gray-500 dark:text-gray-300">{title}</div>
        <div className="kpi-value">{value}</div>
      </div>
      <div className="kpi-icon">{icon}</div>
    </div>
    {delta && <div className="text-xs text-gray-500 mt-3">{delta}</div>}
  </div>
);

const ChartPlaceholder = ({ title }) => (
  <div className="card">
    <div className="flex items-center justify-between mb-4">
      <div className="font-semibold">{title}</div>
      <div className="text-xs text-gray-500">Last 30 days</div>
    </div>
    <div className="chart-placeholder" aria-hidden>
      {/* simple svg placeholder */}
      <svg width="100%" height="120" viewBox="0 0 400 120" preserveAspectRatio="none">
        <defs>
          <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 80 C50 40 100 60 150 50 C200 40 250 30 300 45 C350 60 400 20 400 20 L400 120 L0 120 Z" fill="url(#g)" stroke="none" />
      </svg>
    </div>
  </div>
);

const ActivityItem = ({ title, subtitle, time }) => (
  <div className="activity-item">
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm">A</div>
      <div className="flex-1">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-gray-500">{subtitle}</div>
      </div>
      <div className="text-xs text-gray-400">{time}</div>
    </div>
  </div>
);

export default function DashboardTab() {
  const stats = [
    { title: 'Revenue', value: '$24,300', delta: '+8.2% vs last month', icon: (<svg className="icon-svg" viewBox="0 0 24 24"><path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg>) },
    { title: 'Customers', value: '1,320', delta: '+4.5% this month', icon: (<svg className="icon-svg" viewBox="0 0 24 24"><path d="M12 12a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg>) },
    { title: 'Appointments', value: '432', delta: '-1.1% this month', icon: (<svg className="icon-svg" viewBox="0 0 24 24"><path d="M3 7h18M7 3v4" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg>) },
    { title: 'Satisfaction', value: '4.8 / 5', delta: '+0.2', icon: (<svg className="icon-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg>) },
  ];

  const activities = [
    { title: 'New booking: Sarah K', subtitle: 'Appointment for Consultation', time: '2m' },
    { title: 'Payment received', subtitle: 'Invoice #4521', time: '20m' },
    { title: 'New user: jon.doe@example.com', subtitle: 'Signed up via email', time: '1h' },
  ];

  const [selected, setSelected] = useState(stats[0].title);

  return (
    <div className="dashboard-tab">
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Overview</h2>
            <p className="text-sm text-gray-500">Quick summary of system health and activity.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="btn">New report</button>
            <button className="btn ghost">Export</button>
          </div>
        </div>
      </header>
    


      {/* Tabs: horizontal on desktop, stacked on mobile */}
      <section className="mb-6">
        <div className="tabs" role="tablist" aria-label="Overview tabs">
          {stats.map(s => (
            <button
              key={s.title}
              role="tab"
              aria-selected={selected === s.title}
              onClick={() => { startLoading(); setSelected(s.title); setTimeout(() => { /* simulate quick load */ }, 250); }}
              className={`tab-button ${selected === s.title ? 'active' : ''}`}
            >
              <div className="tab-left">
                <div className="tab-label">{s.title}</div>
                <div className="tab-delta text-xs text-gray-500">{s.delta}</div>
              </div>
              <div className="tab-value">{s.value}</div>
            </button>
          ))}
        </div>
      </section>
  <br></br>
      <br></br>
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ChartPlaceholder title={`${selected} — Trend`} />
        </div>
        <br></br>
      <br></br>

        <div>
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="font-semibold">Recent activity</div>
              <div className="text-xs text-gray-500">Today</div>
            </div>
            <div className="space-y-2">
              {activities.map((a, i) => (<ActivityItem key={i} {...a} />))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
