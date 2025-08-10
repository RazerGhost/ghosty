import Link from "next/link";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { MapPin, Briefcase, FileText, Mail } from "lucide-react";

export function AboutTile({ card = "" }: { card?: string }) {
    return (
        <Card
            className={`col-span-12 md:col-span-3 relative overflow-hidden ${card} group`}
        >
            {/* soft primary wash on hover */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            <CardBody className="h-full flex flex-col justify-center gap-3 relative z-10">
                {/* Heading */}
                <div>
                    <h1 className="text-[clamp(20px,2.4vw,24px)] font-semibold leading-tight">
                        Dimitri de Jong
                    </h1>
                    <p className="text-[clamp(12px,1.6vw,14px)] text-foreground/70">
                        Web Developer
                    </p>
                </div>

                {/* Meta chips */}
                <div className="flex flex-wrap gap-2">
                    <Chip size="sm" variant="flat" radius="sm" startContent={<MapPin size={14} />}>
                        NL / EU
                    </Chip>
                    <Chip size="sm" variant="flat" radius="sm" startContent={<Briefcase size={14} />}>
                        Available
                    </Chip>
                </div>

                {/* Tagline */}
                <p className="text-xs text-foreground/60 line-clamp-2">
                    Doing whatever i like at the moment
                </p>

                {/* CTAs */}
                <div className="mt-1 grid grid-cols-2 gap-2">
                    <Link href="/resume">
                        <Button fullWidth size="sm" variant="flat" startContent={<FileText size={16} />}>
                            Resume
                        </Button>
                    </Link>
                    <Link href="mailto:info@rg-digital.xyz">
                        <Button fullWidth size="sm" variant="bordered" startContent={<Mail size={16} />}>
                            Email
                        </Button>
                    </Link>
                </div>
            </CardBody>
        </Card>
    );
}
