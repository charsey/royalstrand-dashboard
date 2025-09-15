import React, { useState, useRef, useEffect } from 'react';
import { startLoading } from './TopProgress';
import BranchesMap from './BranchesMap';
import ProfitOverview from './ProfitOverview';

// Lightweight month calendar component (no external deps)
function MiniCalendar() {
  const today = new Date();
  const [view, setView] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const monthStart = new Date(view.getFullYear(), view.getMonth(), 1);
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  const startDay = monthStart.getDay(); // 0 (Sun) - 6 (Sat)

  const cells = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(view.getFullYear(), view.getMonth(), d));

  function prevMonth() {
    setView(v => new Date(v.getFullYear(), v.getMonth() - 1, 1));
  }
  function nextMonth() {
    setView(v => new Date(v.getFullYear(), v.getMonth() + 1, 1));
  }

  const monthName = view.toLocaleString(undefined, { month: 'long' });
  const [monthOpen, setMonthOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);
  const wrapRef = useRef(null);

  // close dropdowns on outside click
  useEffect(() => {
    function onDoc(e) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) {
        setMonthOpen(false);
        setYearOpen(false);
      }
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const months = Array.from({ length: 12 }).map((_, i) => new Date(0, i).toLocaleString(undefined, { month: 'long' }));
  const currentYear = view.getFullYear();
  const years = Array.from({ length: 11 }).map((_, i) => currentYear - 5 + i);

  function selectMonthIndex(i) {
    setView(v => new Date(v.getFullYear(), i, 1));
    setMonthOpen(false);
  }
  function selectYear(y) {
    setView(v => new Date(y, v.getMonth(), 1));
    setYearOpen(false);
  }

  return (
    <div className="card mini-calendar" role="region" aria-label="Calendar" ref={wrapRef}>
      <div className="flex items-center justify-between mb-3">
        <div className="font-semibold">
          <span className="month-select">
            <button className="link-btn" onClick={(e) => { e.stopPropagation(); setMonthOpen(m => !m); setYearOpen(false); }} aria-haspopup="listbox" aria-expanded={monthOpen}>{monthName}</button>
          </span>
          {' '}
          <span className="year-select">
            <button className="link-btn" onClick={(e) => { e.stopPropagation(); setYearOpen(y => !y); setMonthOpen(false); }} aria-haspopup="listbox" aria-expanded={yearOpen}>{view.getFullYear()}</button>
          </span>
        </div>
        <div className="flex gap-2">
          <button aria-label="Previous month" className="icon-btn" onClick={() => { prevMonth(); }}>&lt;</button>
          <button aria-label="Next month" className="icon-btn" onClick={() => { nextMonth(); }}>&gt;</button>
        </div>
      </div>
      {/* Dropdowns for month and year */}
      {monthOpen && (
        <div className="mini-dropdown" role="listbox" aria-label="Select month">
          {months.map((m, idx) => (
            <button
              key={m}
              role="option"
              aria-selected={view.getMonth() === idx}
              className="dropdown-item"
              onClick={(e) => { e.stopPropagation(); selectMonthIndex(idx); }}
            >{m}</button>
          ))}
        </div>
      )}
      {yearOpen && (
        <div className="mini-dropdown" role="listbox" aria-label="Select year">
          {years.map(y => (
            <button
              key={y}
              role="option"
              aria-selected={view.getFullYear() === y}
              className="dropdown-item"
              onClick={(e) => { e.stopPropagation(); selectYear(y); }}
            >{y}</button>
          ))}
        </div>
      )}
      <div className="cal-grid" aria-hidden={false}>
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
          <div key={d} className="cal-weekday text-xs text-gray-500">{d}</div>
        ))}
        {Array.from({ length: Math.ceil(cells.length / 7) * 7 }).map((_, idx) => {
          const cell = cells[idx];
          if (!cell) return <div key={idx} className="cal-day empty" />;
          const isToday = cell.toDateString() === today.toDateString();
          return (
            <button key={idx} className={`cal-day ${isToday ? 'today' : ''}`} aria-current={isToday ? 'date' : undefined} onClick={() => { /* could open day details */ }}>
              <span className="cal-day-number">{cell.getDate()}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// removed unused Stat component (was causing lint warning)

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
    { title: 'Profit (month)', value: '$24,300', delta: '+8.2% vs last month', icon: (<svg className="icon-svg" viewBox="0 0 24 24"><path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg>) },
    { title: 'Reports', value: '1,320', delta: '+4.5% this month', icon: (<svg className="icon-svg" viewBox="0 0 24 24"><path d="M12 12a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg>) },
    { title: 'Members', value: '432', delta: '-1.1% this month', icon: (<svg className="icon-svg" viewBox="0 0 24 24"><path d="M3 7h18M7 3v4" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg>) },
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
          <MiniCalendar />
          <div className="mt-4">
            <BranchesMap />
            <div className="mt-4">
              <ProfitOverview />
            </div>
          </div>
          <div className="card mt-4">
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
