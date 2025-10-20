// components/Tiles/TimeTheme.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { SunMoon } from "lucide-react";

import { ThemeSwitch } from "@/components/theme-switch";

export function TimeThemeTile({
  card = "",
  header = "",
  body = "",
  size = "col-span-12 md:col-span-2",
}: {
  card?: string;
  header?: string;
  body?: string;
  size?: string;
}) {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);

    return () => clearInterval(id);
  }, []);

  const time = now
    ? now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "--:--:--";
  const date = now
    ? now.toLocaleDateString([], {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <Card className={`${size} ${card}`}>
      <CardHeader className={`${header} flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <SunMoon size={18} />
          <span className="text-sm font-medium">Time & Theme</span>
        </div>
        <ThemeSwitch />
      </CardHeader>
      <CardBody className={`${body} grid place-items-center`}>
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-semibold tabular-nums">
            {time}
          </div>
          <div className="text-xs text-foreground/60">{date}</div>
        </div>
      </CardBody>
    </Card>
  );
}
