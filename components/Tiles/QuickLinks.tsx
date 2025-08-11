import Link from "next/link";
import { Card, CardBody } from "@heroui/card";


export function QuickLinksTile({
    links = [
        { href: "/resume", label: "Resume" },
        { href: "/blog", label: "Blog" },
        { href: "/about", label: "About" },
        { href: "https://rg-digital.xyz", label: "RG-Digital", ext: true },
    ],
    card = "",
    header = "",
    body = "",
    size = ""
}: {
    links?: { href: string; label: string; ext?: boolean }[];
    card?: string;
    header?: string;
    body?: string;
    size?: string;
}) {
    return (
        <Card className={`${size} rounded-2xl h-full border border-foreground/10 ${card}`}>
            <CardBody className={`grid grid-cols-2 sm:grid-cols-4 gap-2 ${body}`}>
                {links.map((l) => (
                    <Link
                        key={l.label}
                        href={l.href}
                        target={l.ext ? "_blank" : undefined}
                        className="rounded-xl border border-foreground/10 grid place-items-center text-xs
                       hover:border-foreground/20 hover:shadow-sm transition-colors px-2 py-2 text-center"
                    >
                        {l.label}
                    </Link>
                ))}
            </CardBody>
        </Card>
    );
}
