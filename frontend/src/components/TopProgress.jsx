import React, { useEffect, useState, useRef } from 'react';

let startFn = null;
let doneFn = null;

export function startLoading() {
  if (startFn) startFn();
}

export function finishLoading() {
  if (doneFn) doneFn();
}

export default function TopProgress() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    startFn = () => {
      if (timerRef.current) return; // already running
      setVisible(true);
      setProgress(6);
      timerRef.current = setInterval(() => {
        setProgress(p => {
          // increment quickly at first then slow down
          const next = p + Math.max(1, (100 - p) * 0.05);
          return Math.min(next, 90);
        });
      }, 150);
    };

    doneFn = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setProgress(100);
      // hide after short delay
      setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 300);
    };

    return () => {
      startFn = null;
      doneFn = null;
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div aria-hidden>
      <div className="top-progress-root" style={{ height: visible ? 3 : 0, transition: 'height 120ms ease' }}>
        <div className="top-progress-bar" style={{ width: `${progress}%`, transformOrigin: 'left', transition: 'width 180ms linear', height: 3 }} />
      </div>
    </div>
  );
}
