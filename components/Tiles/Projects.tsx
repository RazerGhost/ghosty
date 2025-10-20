import Link from "next/link";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Rocket, PanelsTopLeft } from "lucide-react";
export function ProjectsTile({
  card = "",
  header = "",
  body = "",
  size = "",
}: {
  card?: string;
  header?: string;
  body?: string;
  size?: string;
}) {
  return (
    <Card className={`${size} ${card} relative overflow-hidden`}>
      {/* <div className="pointer-events-none absolute -right-6 -top-6 opacity-10">
                <Rocket size={80} />
            </div> */}
      <CardHeader className={header}>
        <div className="flex items-center gap-2">
          <Rocket size={18} />
          <h3 className="text-sm font-medium">Projects</h3>
        </div>
      </CardHeader>

      <CardBody className={`${body} flex flex-col gap-3`}>
        {/* swap these for real data later */}
        <Link
          className="group flex items-center justify-between rounded-xl border border-foreground/10 px-3 py-2 hover:border-foreground/20 transition"
          href="https://proluma.nl/"
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">Proluma</p>
            <div className="mt-1 flex gap-1">
              <Tag>Wordpress</Tag>
              <Tag>React</Tag>
              <Tag>API&apos;s</Tag>
            </div>
          </div>
          <PanelsTopLeft
            className="shrink-0 opacity-60 group-hover:opacity-100"
            size={16}
          />
        </Link>

        <Link
          className="group flex items-center justify-between rounded-xl border border-foreground/10 px-3 py-2 hover:border-foreground/20 transition"
          href="https://github.com/RazerGhost/Shiftsail"
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">Shiftsail</p>
            <div className="mt-1 flex gap-1">
              <Tag>Laravel</Tag>
              <Tag>PHP</Tag>
            </div>
          </div>
          <PanelsTopLeft
            className="shrink-0 opacity-60 group-hover:opacity-100"
            size={16}
          />
        </Link>

        <div className="mt-auto pt-2">
          <Link href="/projects">
            <Button
              fullWidth
              color="primary"
              endContent={<PanelsTopLeft size={16} />}
              variant="solid"
            >
              View github projects
            </Button>
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}

function Tag({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-md border border-foreground/10 px-2 py-[2px] text-[11px] ${className}`}
    >
      {children}
    </span>
  );
}
