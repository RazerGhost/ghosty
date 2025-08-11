import Link from "next/link";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Rocket } from "lucide-react";

export function BusinessCardTile({
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
        <Card className={`${size} ${card} overflow-hidden`}>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
            <CardHeader className={header}>
                <div className="flex items-center gap-2">
                    <Rocket size={18} />
                    <h3 className="text-sm font-medium">Business Inquiry</h3>
                </div>
            </CardHeader>

            <CardBody className={`${body} relative flex flex-col gap-3`}>
                <p className="text-sm text-foreground/80">
                    Need a fast, clean web app or embedded integration? I ship end-to-end.
                </p>

                <div className="flex flex-wrap gap-1.5">
                    <Chip variant="flat" radius="sm" color="primary">Wordpress</Chip>
                    <Chip variant="flat" radius="sm" color="primary">Laravel</Chip>
                    <Chip variant="flat" radius="sm" color="primary">React</Chip>
                    <Chip variant="flat" radius="sm" color="primary">API's</Chip>
                </div>

                <div className="mt-auto grid grid-cols-2 gap-2 pt-2">
                    <Link href="https://rg-digital.xyz" target="_blank">
                        <Button fullWidth variant="solid" color="primary">rg-digital.xyz</Button>
                    </Link>
                    <Link href="mailto:info@rg-digital.xyz">
                        <Button fullWidth variant="bordered">Email</Button>
                    </Link>
                </div>
            </CardBody>
        </Card>
    )
}
