"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Rocket } from "lucide-react";

export default function NotFound() {
  const [active, setActive] = useState(false);
  const [launchId, setLaunchId] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const triggerLaunch = () => {
    setLaunchId((n) => n + 1);
    setActive(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setActive(false), 2600); // match animation
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="relative flex h-dvh flex-col items-center justify-center overflow-hidden bg-background px-6 text-center">
      {/* Rocket overlay (only when active) */}
      {active && (
        <div key={launchId} className="pointer-events-none absolute inset-0">
          {/* Trail */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-8 h-64 w-2 bg-gradient-to-b from-transparent via-primary/60 to-transparent animate-trace-long" />
          {/* Rocket */}
          <Rocket
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary drop-shadow-lg animate-crash-slow"
            size={96}
          />
        </div>
      )}

      {/* Content */}
      <h1 className="text-7xl font-bold">404</h1>
      <p className="mt-3 text-lg text-foreground/70">
        Looks like we drifted off course…
      </p>

      <Link
        className="mt-6 inline-block rounded-lg bg-primary px-6 py-3 text-white shadow-lg transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
        href="/"
        onClick={triggerLaunch} // for touch/mobile too
        onFocus={triggerLaunch}
        onMouseEnter={triggerLaunch}
      >
        Take me home
      </Link>
    </div>
  );
}
