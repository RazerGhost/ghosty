import Link from "next/link";
import { Card, CardBody } from "@heroui/card";


export function QuickLinksTile({
    links = [
        { href: "/resume", label: "Resume" },
        { href: "/blog", label: "Blog" },
        { href: "/about", label: "About" },
        { href: "https://rg-digital.xyz", label: "RG-Digital", ext: true },
    ],
    className = ""
}: {
    links?: { href: string; label: string; ext?: boolean }[];
    className?: string;
}) {
    return (
        <Card className={`rounded-2xl h-full border border-foreground/10 ${className}`}>
            <CardBody className="grid grid-cols-2 gap-2">
                {links.map((l) => (
                    <Link
                        key={l.label}
                        href={l.href}
                        target={l.ext ? "_blank" : undefined}
                        className="aspect-square rounded-xl border border-foreground/10 grid place-items-center text-xs
                       hover:border-foreground/20 hover:shadow-sm transition-colors"
                    >
                        {l.label}
                    </Link>
                ))}
            </CardBody>
        </Card>
    );
}
