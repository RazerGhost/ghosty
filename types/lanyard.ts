export interface LanyardResponse {
  loading: boolean;
  status: Status;
}

export interface Status {
  kv: Record<string, string>;
  discord_user: DiscordUser;
  activities: Activity[];
  discord_status: "online" | "idle" | "dnd" | "offline";
  active_on_discord_web: boolean;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  active_on_discord_embedded: boolean;
  listening_to_spotify: boolean;
  spotify: Spotify | null;
}

export interface DiscordUser {
  id: string;
  username: string;
  avatar: string | null;
  discriminator: string;
  clan: Clan | null;
  primary_guild: PrimaryGuild | null;
  avatar_decoration_data: unknown | null;
  collectibles: unknown | null;
  bot: boolean;
  global_name: string | null;
  display_name: string | null;
  public_flags: number;
  display_name_styles: unknown | null;
}

export interface Clan {
  tag: string;
  identity_guild_id: string;
  badge: string;
  identity_enabled: boolean;
}

export interface PrimaryGuild {
  tag: string;
  identity_guild_id: string;
  badge: string;
  identity_enabled: boolean;
}

/**
 * Activity.type reference:
 * 0 = Game / Playing
 * 1 = Streaming
 * 2 = Listening
 * 3 = Watching
 * 4 = Custom Status
 */
export type ActivityType = 0 | 1 | 2 | 3 | 4;

export type Activity =
  | CustomStatusActivity
  | ListeningActivity
  | GameActivity
  | WatchingActivity
  | StreamingActivity;

export interface BaseActivity {
  id: string;
  name: string;
  type: ActivityType;
  metadata: Record<string, unknown>;
  session_id: string;
  created_at: number;
  flags?: number;
  timestamps?: {
    start: number;
    end?: number;
  };
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
  application_id?: string;
  party?: { id: string };
  buttons?: string[];
  platform?: string;
}

export interface CustomStatusActivity extends BaseActivity {
  type: 4;
  emoji?: { name: string; id?: string; animated?: boolean };
  state?: string;
}

export interface ListeningActivity extends BaseActivity {
  type: 2;
  state: string; // usually artist name
  details: string; // usually track name
  sync_id?: string;
}

export interface GameActivity extends BaseActivity {
  type: 0;
  state?: string;
  details?: string;
}

export interface WatchingActivity extends BaseActivity {
  type: 3;
  state?: string;
  details?: string;
}

export interface StreamingActivity extends BaseActivity {
  type: 1;
  state?: string;
  details?: string;
}

export interface Spotify {
  timestamps: {
    start: number;
    end: number;
  };
  album: string;
  album_art_url: string;
  artist: string;
  song: string;
  track_id: string;
}

/**
 * Generic type guard & filter for activities
 */
export function activitiesOfType<T extends ActivityType>(
  activities: Activity[],
  type: T
): Extract<Activity, { type: T }>[] {
  return activities.filter(
    (a): a is Extract<Activity, { type: T }> => a.type === type
  );
}
