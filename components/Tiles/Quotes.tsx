"use client";

import * as React from "react";
import { Card, CardBody } from "@heroui/card";
import { Quote } from "lucide-react";

const QUOTES = [
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
    { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
    { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
    { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
];

export function QuotesTile({ card = "", header = "", body = "", size = "" }: { card?: string; header?: string; body?: string; size?: string }) {
    const [index, setIndex] = React.useState(0);

    React.useEffect(() => {
        const id = setInterval(() => {
            setIndex((prev) => (prev + 1) % QUOTES.length);
        }, 7000); // change every 7s
        return () => clearInterval(id);
    }, []);

    const { text, author } = QUOTES[index];

    return (
        <Card className={`${size} ${card}`}>
            <CardBody className={`h-full flex flex-col items-center justify-center text-center gap-2 p-3 ${body}`}>
                <Quote size={18} className="opacity-60" />
                <p className="text-xs italic leading-snug">"{text}"</p>
                <span className="text-[10px] text-foreground/60">— {author}</span>
            </CardBody>
        </Card>
    );
}
