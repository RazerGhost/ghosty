import React from "react";
import { Card, CardBody } from "@heroui/card";

export function LocalTimeTile({ card = "", header = "", body = "", size = "" }: { card?: string; header?: string; body?: string; size?: string }) {
    const [now, setNow] = React.useState(new Date());
    React.useEffect(() => {
        const t = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(t);
    }, []);

    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    const date = now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric", year: "numeric" });
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return (
        <Card className={`${card} rounded-2xl h-full border border-foreground/10 ${size}`}>
            <CardBody className={`h-full flex flex-col items-center justify-center leading-tight ${body}`}>
                <div className="text-xs text-foreground/60">{date}</div>
                <div className="text-lg font-semibold">{time}</div>
                <div className="text-xs text-foreground/40">{timeZone}</div>
            </CardBody>
        </Card>
    );
}
