import Link from "next/link";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Music, BarChart3 } from "lucide-react";

export function MusicStatsTile({
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
    <Card className={`${size} ${card}`}>
      <CardHeader className={`${header} flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <BarChart3 size={18} />
          <h3 className="text-sm font-medium">Music Stats</h3>
        </div>
        {/* fake period selector for now */}
        <div className="hidden md:flex gap-1">
          <Chip radius="sm" variant="faded">
            Week
          </Chip>
          <Chip radius="sm" variant="faded">
            Month
          </Chip>
          <Chip radius="sm" variant="faded">
            Year
          </Chip>
        </div>
      </CardHeader>

      <CardBody className={`${body} flex flex-col gap-3`}>
        {/* Tiny spark bars – swap with real data later */}
        <div>
          <div className="flex items-center justify-between text-xs">
            <span className="truncate mr-2">Top Tracks</span>
            <span className="opacity-60">Plays</span>
          </div>
          <div className="mt-2 space-y-2">
            <Spark label="Track A" value={72} />
            <Spark label="Track B" value={54} />
            <Spark label="Track C" value={33} />
          </div>
        </div>

        <div className="flex flex-row gap-3">
          <Chip radius="sm" variant="faded">
            House
          </Chip>
          <Chip radius="sm" variant="faded">
            Synthwave
          </Chip>
          <Chip radius="sm" variant="faded">
            Lo-fi
          </Chip>
        </div>

        <div className="mt-auto pt-2">
          <Link href="/music">
            <Button
              fullWidth
              endContent={<Music size={16} />}
              variant="bordered"
            >
              Open stats
            </Button>
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}

function Spark({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="truncate text-xs w-24">{label}</span>
      <div className="flex-1 h-2 rounded-full bg-foreground/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-foreground/40"
          style={{ width: `${Math.max(4, Math.min(value, 100))}%` }}
        />
      </div>
      <span className="text-xs tabular-nums w-8 text-right opacity-70">
        {value}
      </span>
    </div>
  );
}
