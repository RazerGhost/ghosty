import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { Github, PanelsTopLeft } from "lucide-react";
import Link from "next/link";


export function GithubStatsTile({
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
                    <Github size={18} />
                    <span className="text-sm font-medium">GitHub</span>
                </div>
                <Chip size="sm" variant="flat">Stats</Chip>
            </CardHeader>
            <CardBody className={`${body} flex flex-col gap-4`}>
                <div className="flex flex-wrap gap-2">
                    <Chip variant="flat">Repos: 24</Chip>
                    <Chip variant="flat">Stars: 102</Chip>
                    <Chip variant="flat">PRs: 58</Chip>
                </div>
                <div className="h-20 md:h-24 rounded-xl bg-foreground/10 grid place-items-center text-xs text-foreground/60">
                    Contribution heatmap placeholder
                </div>
                <div className="mt-auto flex justify-end">
                    <Link href="https://github.com/RazerGhost" target="_blank">
                        <Button size="sm" variant="bordered" endContent={<PanelsTopLeft size={16} />}>View Profile</Button>
                    </Link>
                </div>
            </CardBody>
        </Card>
    )
}
