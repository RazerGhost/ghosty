"use client";

import * as React from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";

// props let you hardcode or fetch later
type Props = {
    className?: string;
    city?: string;
    tempC?: number;
    summary?: string;     // e.g. "Clear", "Overcast"
    icon?: React.ReactNode;
};

export function WeatherMini({
    className = "",
    city = "Amsterdam",
    tempC = 18,
    summary = "Clear",
    icon,
}: Props) {
    return (
        <Card className={`col-span-12 md:col-span-2 relative overflow-hidden ${className}`}>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
            <CardHeader className="pb-0 pt-3 px-3 md:px-4">
                <span className="text-sm font-medium">Weather</span>
            </CardHeader>
            <CardBody className="pt-3 px-3 md:px-4 relative z-10">
                <div className="flex items-center justify-between">
                    <div className="min-w-0">
                        <div className="text-sm font-semibold truncate">{city}</div>
                        <div className="text-xs text-foreground/60 truncate">{summary}</div>
                    </div>
                    <div className="flex items-center gap-2">
                        {icon ?? <span className="i-[solar--sun-2-outline] size-5 opacity-80" />}
                        <span className="text-2xl font-semibold tabular-nums">
                            {Math.round(tempC)}°
                        </span>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}
