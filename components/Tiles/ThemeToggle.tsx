import { Card, CardBody, CardHeader } from "@heroui/card";
import { ThemeSwitch } from "@/components/theme-switch";

export function ThemeToggleTile({
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
            <CardBody className={`h-full grid place-items-center ${body}`}>
                <ThemeSwitch />
            </CardBody>
        </Card>
    );
}
