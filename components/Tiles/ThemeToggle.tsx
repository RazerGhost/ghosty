import { Card, CardBody, CardHeader } from "@heroui/card";
import { ThemeSwitch } from "@/components/theme-switch";

export function ThemeToggleTile({
    card = "",
    header = "",
    body = "",
}: {
    card?: string;
    header?: string;
    body?: string;
}) {
    return (
        <Card className={`col-span-6 md:col-span-2 ${card}`}>
            <CardBody className="h-full grid place-items-center">
                <ThemeSwitch />
            </CardBody>
        </Card>
    );
}
