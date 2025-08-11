
export const revalidate = 86400;

const TZ = "Europe/Amsterdam";

function dayOfYearInTZ(d = new Date(), timeZone = TZ) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  })
    .formatToParts(d)
    .reduce((acc, p) => ((acc[p.type] = p.value), acc), {} as any);

  const y = Number(parts.year);
  const m = Number(parts.month);
  const day = Number(parts.day) + 1;

  const local = new Date(y, m - 1, day);
  const start = new Date(y, 0, 1);
  return Math.floor((+local - +start) / 86400000) + 1;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const dayParam = url.searchParams.get("day");
  if (!dayParam) {
    const day = dayOfYearInTZ();
    url.searchParams.set("day", String(day));
    return Response.redirect(url.toString(), 307);
  }

  const day = Number(dayParam) || dayOfYearInTZ();
  const target = `https://www.bible.com/verse-of-the-day?day=${day}`;

  try {
    const res = await fetch(target, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome Safari",
        accept: "text/html",
      },
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const html = await res.text();

    const getMeta = (prop: string) => {
      const a = new RegExp(
        `<meta[^>]+property=["']${prop}["'][^>]+content=["']([^"']+)["']`,
        "i"
      ).exec(html);
      const b = a
        ? a
        : new RegExp(
            `<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${prop}["']`,
            "i"
          ).exec(html);
      return b?.[1] ?? "";
    };

    const reference = getMeta("og:title");
    const text = getMeta("og:description");
    const image = getMeta("og:image");
    if (!text || !reference) throw new Error("VOTD not found");
    return new Response(
      JSON.stringify({ day, reference, text, image, source: target }),
      {
        headers: {
          "content-type": "application/json",
          // Edge/CDN cache: one day, allow brief stale while revalidating
          "cache-control": "public, s-maxage=86400, stale-while-revalidate=3600",
          "x-votd-day": String(day),
          "x-votd-timezone": TZ,
        },
      }
    );
  } catch (e: any) {
    return new Response(
      JSON.stringify({ error: e?.message ?? "Failed to fetch VOTD", day }),
      {
        status: 500,
        headers: {
          "content-type": "application/json",
          "x-votd-day": String(day),
          "x-votd-timezone": TZ,
        },
      }
    );
  }
}
