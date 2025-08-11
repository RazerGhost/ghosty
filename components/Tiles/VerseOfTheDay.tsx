"use client";

import * as React from "react";
import { Card, CardBody } from "@heroui/card";
import { Quote } from "lucide-react";

type Props = { card?: string; header?: string; body?: string; size?: string; dayOverride?: number };

export function VerseOfTheDayTile({ card = "", header = "", body = "", size = "", dayOverride }: Props) {
    const [votd, setVotd] = React.useState<null | { text: string; author: string; image?: string }>(null);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const url = dayOverride ? `/api/votd?day=${dayOverride}` : `/api/votd`;
        fetch(url)
            .then(async (r) => {
                if (!r.ok) throw new Error(await r.text());
                return r.json();
            })
            .then((data) => {
                if (data?.text && data?.reference) {
                    setVotd({ text: data.text, author: data.reference, image: data.image });
                }
            })
            .catch((e) => setError(typeof e === "string" ? e : e?.message ?? "Failed"));
    }, [dayOverride]);

    return (
        <Card className={`${size} ${card}`}>
            <CardBody className={`h-full flex flex-col items-center justify-center text-center gap-2 p-3 ${body}`}>
                <Quote size={18} className="opacity-60" />
                <p className="text-xs italic leading-snug">
                    "{votd?.text}"
                </p>
                <span className="text-[10px] text-foreground/60">— {votd?.author}</span>
            </CardBody>
        </Card>
    );
}
