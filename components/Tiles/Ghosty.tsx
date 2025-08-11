"use client";

import * as React from "react";
import { Card, CardBody } from "@heroui/card";

type Props = {
    size?: string;
    card?: string;
};

export function GhostyTile({
    size = "",
    card = "",
}: Props) {
    const ghosts = ["👻", "💀", "☠️", "🫥", "🕸️", "🪦", "🧟‍♂️", "🧟‍♀️", "🦴"];
    const [emoji] = React.useState(() => ghosts[Math.floor(Math.random() * ghosts.length)]);

    return (
        <Card
            isHoverable
            isPressable
            className={`relative flex items-center justify-center overflow-hidden ${size} ${card}`}
        >
            <CardBody className="flex items-center justify-center text-5xl opacity-50">
                {emoji}
            </CardBody>
        </Card>
    );
}
