import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

// Generate last 12 months labels and sample profit numbers per branch
function makeData() {
  const now = new Date();
  const months = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(d.toLocaleString(undefined, { month: 'short' }));
  }

  // deterministic sample numbers for each branch
  const base = {
    Kigali: 24000,
    Nairobi: 31000,
    Johannesburg: 42000,
    Accra: 18000,
  };

  return months.map((m, idx) => ({
    month: m,
    Kigali: Math.round(base.Kigali * (0.85 + (idx % 6) * 0.05)),
    Nairobi: Math.round(base.Nairobi * (0.80 + ((idx + 2) % 6) * 0.06)),
    Johannesburg: Math.round(base.Johannesburg * (0.78 + ((idx + 4) % 6) * 0.07)),
    Accra: Math.round(base.Accra * (0.9 + ((idx + 1) % 5) * 0.04)),
  }));
}

export default function ProfitOverview({ className = '' }) {
  const data = useMemo(() => makeData(), []);

  return (
    <div className={`card profit-overview ${className}`} role="region" aria-label="Profit Overview">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Profit Overview</h3>
        <div className="text-xs text-gray-500">Last 12 months</div>
      </div>

      <div style={{ width: '100%', height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 6, right: 12, left: 6, bottom: 6 }}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.06} />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            <Legend verticalAlign="top" height={36} />

            <Line type="monotone" dataKey="Kigali" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} animationDuration={900} />
            <Line type="monotone" dataKey="Nairobi" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} animationDuration={900} />
            <Line type="monotone" dataKey="Johannesburg" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} animationDuration={900} />
            <Line type="monotone" dataKey="Accra" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} animationDuration={900} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
