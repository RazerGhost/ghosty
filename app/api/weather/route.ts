// app/api/weather/route.ts
import { NextResponse } from "next/server";
import { fetchWeatherApi } from "openmeteo";
import { DateTime } from "luxon";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// helper: safely read a variable array by index
function readVarArray<
  T extends Float32Array | Float64Array | Int32Array | BigInt64Array | undefined
>(container: any, idx: number): number[] | undefined {
  const v = container?.variables?.(idx);
  if (!v) return undefined;
  const arr = v.valuesArray?.() as
    | Float32Array
    | Float64Array
    | Int32Array
    | undefined;
  return arr ? Array.from(arr) : undefined;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const latitude = Number(searchParams.get("lat") ?? 52.3508);
    const longitude = Number(searchParams.get("lon") ?? 5.2647);
    const model = searchParams.get("model") || undefined;

    const params: any = {
      latitude,
      longitude,
      timezone: "auto", // important: Open-Meteo returns times in local timezone
      // models: model,
      current: [
        "temperature_2m", // 0
        "apparent_temperature", // 1
        "relative_humidity_2m", // 2
        "is_day", // 3
        "weather_code", // 4
        "wind_speed_10m", // 5
        "wind_direction_10m", // 6
      ],
      hourly: [
        "temperature_2m", // 0
        "precipitation_probability", // 1
        "weather_code", // 2
      ],
      daily: [
        "sunrise", // 0
        "sunset", // 1
        "uv_index_max", // 2
        "precipitation_sum", // 3
        "temperature_2m_max", // 4
        "temperature_2m_min", // 5
        "weather_code", // 6
      ],
    };

    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);
    if (!responses?.length) {
      return NextResponse.json({ error: "No weather response" }, { status: 502 });
    }
    const res = responses[0];

    const tzOffset = res.utcOffsetSeconds();
    const timezone = res.timezone?.() ?? "UTC";
    const localNow = DateTime.now().setZone(timezone);

    // meta
    const meta = {
      latitude: res.latitude?.(),
      longitude: res.longitude?.(),
      elevation: res.elevation?.(),
      utcOffsetSeconds: tzOffset,
      timezone,
      model: res.model?.(),
    };

    // CURRENT
    const currentBlock = res.current?.();
    const current = {
      tempC: currentBlock?.variables?.(0)?.value?.() ?? null,
      feelsLikeC: currentBlock?.variables?.(1)?.value?.() ?? null,
      humidity: currentBlock?.variables?.(2)?.value?.() ?? null,
      isDay: Boolean(currentBlock?.variables?.(3)?.value?.() ?? 0),
      weatherCode: currentBlock?.variables?.(4)?.value?.() ?? null,
      windSpeedKph: currentBlock?.variables?.(5)?.value?.() ?? null,
      windDirDeg: currentBlock?.variables?.(6)?.value?.() ?? null,
    };

    // ===== HOURLY — next 24h starting from current local hour =====
    const hourlyBlock = res.hourly?.();
    const hStart = Number(hourlyBlock?.time?.() ?? 0);
    const hEnd = Number(hourlyBlock?.timeEnd?.() ?? 0);
    const hStep = Number(hourlyBlock?.interval?.() ?? 3600);
    const hoursTotal = Math.max(0, Math.floor((hEnd - hStart) / hStep));
    const timesAll = Array.from({ length: hoursTotal }, (_, i) =>
      DateTime.fromSeconds(hStart + i * hStep, { zone: "utc" })
        .setZone(timezone)
        .toISO()
    );

    const tempsAll = readVarArray(hourlyBlock, 0) ?? [];
    const popAll = readVarArray(hourlyBlock, 1) ?? [];
    const codesAll = readVarArray(hourlyBlock, 2) ?? [];

    // find first index matching current local hour (fallback 0)
    let currentHourIndex = timesAll.findIndex(
      (iso) => iso !== null && DateTime.fromISO(iso).hour === localNow.hour
    );
    if (currentHourIndex < 0) currentHourIndex = 0;

    const sliceCount = Math.min(24, hoursTotal);
    const hourly = {
      time: [] as string[],
      temperature2m: [] as (number | null)[],
      precipProb: [] as (number | null)[],
      weatherCode: [] as (number | null)[],
    };

    for (let i = 0; i < sliceCount; i++) {
      const idx = (currentHourIndex + i) % hoursTotal;
      hourly.time.push(timesAll[idx] ?? "");
      hourly.temperature2m.push(tempsAll[idx] ?? null);
      hourly.precipProb.push(popAll[idx] ?? null);
      hourly.weatherCode.push(codesAll[idx] ?? null);
    }
    // ===============================================================

    // DAILY (next 3 days)
    const dailyBlock = res.daily?.();
    const dStart = Number(dailyBlock?.time?.() ?? 0);
    const dEnd = Number(dailyBlock?.timeEnd?.() ?? 0);
    const dStep = Number(dailyBlock?.interval?.() ?? 86400);
    const daysTotal = Math.max(0, Math.floor((dEnd - dStart) / dStep));
    const daysTake = Math.min(3, daysTotal);

    const dSunrise = readVarArray(dailyBlock, 0) ?? [];
    const dSunset = readVarArray(dailyBlock, 1) ?? [];
    const dUv = readVarArray(dailyBlock, 2) ?? [];
    const dPrecip = readVarArray(dailyBlock, 3) ?? [];
    const dTmax = readVarArray(dailyBlock, 4) ?? [];
    const dTmin = readVarArray(dailyBlock, 5) ?? [];
    const dCodes = readVarArray(dailyBlock, 6) ?? [];

    const daily = {
      time: Array.from({ length: daysTake }, (_, i) =>
        DateTime.fromSeconds(dStart + i * dStep, { zone: "utc" })
          .setZone(timezone)
          .toISO()
      ),
      sunrise: dSunrise.slice(0, daysTake).map((s) =>
        DateTime.fromSeconds((s ?? 0), { zone: "utc" }).setZone(timezone).toISO()
      ),
      sunset: dSunset.slice(0, daysTake).map((s) =>
        DateTime.fromSeconds((s ?? 0), { zone: "utc" }).setZone(timezone).toISO()
      ),
      uvIndexMax: dUv.slice(0, daysTake),
      precipSum: dPrecip.slice(0, daysTake),
      tMax: dTmax.slice(0, daysTake),
      tMin: dTmin.slice(0, daysTake),
      weatherCode: dCodes.slice(0, daysTake),
    };

    return NextResponse.json({ meta, current, hourly, daily });
  } catch (err) {
    console.error("Weather API error:", err);
    return NextResponse.json({ error: "Failed to fetch weather" }, { status: 500 });
  }
}
