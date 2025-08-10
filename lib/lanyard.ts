import { LanyardResponse, Status } from "@/types/lanyard";
import { useLanyard } from "react-use-lanyard";

export function GetUserData(): { loading: boolean; status?: Status } {
  const { loading, status } = useLanyard({
    userId: "425729668482859008",
    socket: true,
  });

  return { loading, status: status as Status | undefined };
}

export function ExtractLink(input: string, type: string) {
    // Handles cases like mp:external/.../https/raw.githubusercontent.com/...
    let urlRegex;
    switch (type) {
        case 'github':
            urlRegex = /(?:https?:\/\/)?raw\.githubusercontent\.com\/[^\s"']+/;
            break;
        case 'spotify':
            urlRegex = /(?:https?:\/\/)?open\.spotify\.com\/[^\s"']+/;
            break;
        default:
            urlRegex = /(?:https?:\/\/)?[^\s"']+/;
            break;
    }
    const matches = input.match(urlRegex);
    if (matches) {
        // Always return a full https link
        return matches[0].startsWith("http") ? matches[0] : `https://${matches[0]}`;
    }
    return "";
}
