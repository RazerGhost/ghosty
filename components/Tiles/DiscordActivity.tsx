import { DiscordLogoIcon } from "@radix-ui/react-icons"
import { Chip } from "@heroui/chip"
import { Card, CardBody, CardHeader } from "@heroui/card"
import { Skeleton } from "@heroui/skeleton";
import { activitiesOfType, type Status } from "@/types/lanyard";
import { GetUserData } from "@/lib/lanyard"
import { Avatar, AvatarGroup, AvatarIcon } from "@heroui/avatar";


export function DiscordActivityTile({ card = "", header = "", body = "" }: { card?: string, header?: string, body?: string }) {
    const { loading, status } = GetUserData()
    const Userstatus = status?.discord_status
    const statusMap = {
        online: { color: "success", text: "Online" },
        idle: { color: "warning", text: "Idle" },
        dnd: { color: "danger", text: "Do Not Disturb" },
        offline: { color: "default", text: "Offline" },
        null: { color: "default", text: "Offline" },
        undefined: { color: "default", text: "Offline" },
    } as const

    if (loading || !status) return <TileSkeleton />;

    const { color: statusColor, text: statusText } = statusMap[Userstatus as keyof typeof statusMap] ?? statusMap["offline"]

    const custom = activitiesOfType(status.activities, 4)[0];
    const playing = activitiesOfType(status.activities, 0)[0];
    const playingAsset = extractLink(playing.assets?.large_image || "");
    console.log("Extracted playing asset:", playingAsset);
    console.log("DiscordActivityTile", { status, custom, playing });

    return (
        <Card className={`col-span-12 md:col-span-4 ${card}`}>
            <CardHeader className={`${header} flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                    <DiscordLogoIcon />
                    <span className="text-sm font-medium">Discord Activity</span>
                </div>
                <Chip size="sm" variant="flat" color={statusColor}>{statusText}</Chip>
            </CardHeader>
            <CardBody className={`${body} flex flex-col gap-3`}>
                {custom && (
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Status:</span>
                        <span className="text-sm">{custom.emoji?.name || "No custom status"}</span>
                    </div>
                )}
                {playing && (
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/40">
                        <Avatar
                            className="w-10 h-10 border border-muted"
                            src={playingAsset || undefined}
                            fallback={playing.name?.[0] || "?"}
                        />
                        <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Playing</span>
                            <span className="text-sm font-semibold">{playing.name || "No game activity"}</span>
                            {playing.details && (
                                <span className="text-xs text-muted-foreground">{playing.details}</span>
                            )}
                        </div>
                    </div>
                )}
            </CardBody>
        </Card>
    )
}

function TileSkeleton() {
    return (
        <Card className="col-span-12 md:col-span-4">
            <CardHeader className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <DiscordLogoIcon />
                    <span className="text-sm font-medium">Discord Activity</span>
                </div>
                <Chip size="sm" variant="flat" color="default">Loading...</Chip>
            </CardHeader>
            <CardBody className="flex flex-col gap-3">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
            </CardBody>
        </Card>
    )
}

function extractLink(input: string) {
    // Handles cases like mp:external/.../https/raw.githubusercontent.com/...
    const urlRegex = /(?:https?:\/\/)?raw\.githubusercontent\.com\/[^\s"']+/;
    const matches = input.match(urlRegex);
    if (matches) {
        // Always return a full https link
        return matches[0].startsWith("http") ? matches[0] : `https://${matches[0]}`;
    }
    return null;
}
