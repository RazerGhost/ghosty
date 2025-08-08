import { LanyardResponse, Status } from "@/types/lanyard";
import { useLanyard } from "react-use-lanyard";

export function GetUserData(): { loading: boolean; status?: Status } {
  const { loading, status } = useLanyard({
    userId: "425729668482859008",
    socket: true,
  });

  return { loading, status: status as Status | undefined };
}
