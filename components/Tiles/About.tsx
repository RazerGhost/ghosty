import Link from "next/link";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { MapPin, Briefcase, FileText, Mail } from "lucide-react";

export function AboutTile({
  card = "",
  header: _header = "",
  body = "",
  size = "",
}: {
  card?: string;
  header?: string;
  body?: string;
  size?: string;
}) {
  return (
    <Card className={`${size} relative overflow-hidden ${card} group`}>
      {/* Hover wash (yours) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      {/* Subtle radial glow */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute -inset-10
          bg-[radial-gradient(120%_80%_at_0%_0%,hsl(var(--primary)/0.18)_0%,transparent_60%)]
          blur-2xl
        "
      />

      {/* Ultra-faint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          color: "hsl(var(--foreground))",
          maskImage:
            "radial-gradient(circle at 20% 15%, black 55%, transparent 80%)", // fade it out towards edges
          WebkitMaskImage:
            "radial-gradient(circle at 20% 15%, black 55%, transparent 80%)",
        }}
      />

      <CardBody
        className={`h-full flex flex-col justify-center gap-3 relative z-10 ${body}`}
      >
        {/* Heading */}
        <div>
          <h1 className="text-[clamp(20px,2.4vw,24px)] font-semibold leading-tight tracking-tight">
            Dimitri de Jong
          </h1>
          <p className="text-[clamp(12px,1.6vw,14px)] text-foreground/70">
            Web Developer
          </p>

          {/* tiny accent underline */}
          <span className="mt-2 block h-[2px] w-12 rounded-full bg-gradient-to-r from-primary/70 to-primary/20" />
        </div>

        {/* Meta chips */}
        <div className="flex flex-wrap gap-2">
          <Chip
            radius="sm"
            size="sm"
            startContent={<MapPin size={14} />}
            variant="flat"
          >
            NL / EU
          </Chip>
          <Chip
            radius="sm"
            size="sm"
            startContent={<Briefcase size={14} />}
            variant="flat"
          >
            Available
          </Chip>
        </div>

        {/* Tagline */}
        <p className="text-xs text-foreground/60 line-clamp-2">
          Doing whatever I like at the moment
        </p>

        {/* CTAs */}
        <div className="mt-1 grid grid-cols-2 gap-2">
          <Link href="/resume">
            <Button
              fullWidth
              size="sm"
              startContent={<FileText size={16} />}
              variant="flat"
            >
              Resume
            </Button>
          </Link>
          <Link href="mailto:info@rg-digital.xyz">
            <Button
              fullWidth
              size="sm"
              startContent={<Mail size={16} />}
              variant="bordered"
            >
              Email
            </Button>
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}
