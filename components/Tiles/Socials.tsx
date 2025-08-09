import { Github, Mail, Linkedin, Instagram, Drama } from "lucide-react";
import Link from "next/link";
import { Card, CardBody } from "@heroui/card";
import { DiscordLogoIcon } from "@radix-ui/react-icons"

export function SocialsTile() {

    return (
        <>
            <div className="col-span-10 md:col-span-3 grid grid-cols-4 md:grid-cols-3 gap-2 md:gap-3">
                <SocialMini href="https://github.com/RazerGhost" label="GitHub"><Github size={24} /></SocialMini>
                <SocialMini href="https://www.linkedin.com/in/dimitri-eleazar-de-jong/" label="LinkedIn"><Linkedin size={24} /></SocialMini>
                <SocialMini href="mailto:info@rg-digital.xyz" label="Email"><Mail size={24} /></SocialMini>
                <SocialMini href="https://discord.com/users/425729668482859008" label="Discord"><DiscordLogoIcon className="w-6 h-6" /></SocialMini>
                <SocialMini href="https://mydramalist.com/profile/RazerGhost" label="MyDramaList"><Drama size={24} /></SocialMini>
                <SocialMini href="https://www.instagram.com/d1mitrl/" label="Instagram"><Instagram size={24} /></SocialMini>
            </div>
        </>
    )
}


function SocialMini({
    href,
    label,
    children,
}: {
    href: string;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <Link
            href={href}
            aria-label={label}
            title={label}
            target={href.startsWith("http") ? "_blank" : undefined}
            className="group rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
        >
            <Card className="rounded-2xl h-full border border-foreground/10 group-hover:border-foreground/20 group-hover:shadow-sm transition-all">
                <CardBody className="aspect-square grid place-items-center">
                    <div className="opacity-80 group-hover:opacity-100 text-sm">{children}</div>
                </CardBody>
            </Card>
        </Link>
    );
}
