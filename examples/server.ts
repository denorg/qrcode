import { qrcode } from "../mod.ts";

const GIF_DATA_URL_PREFIX = "data:image/gif;base64,";
const TYPE_NUMBERS = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
] as const;
const ERROR_CORRECTION_LEVELS = ["L", "M", "Q", "H"] as const;

type TypeNumberOption = (typeof TYPE_NUMBERS)[number];
type ErrorCorrectionLevelOption = (typeof ERROR_CORRECTION_LEVELS)[number];

function parseIntegerParam(
  value: string | null,
  fallback: number,
  min: number,
  max: number,
): number {
  if (value === null || value.trim() === "") return fallback;

  const parsed = Number(value);

  if (!Number.isInteger(parsed)) return fallback;

  return Math.min(max, Math.max(min, parsed));
}

function parseTypeNumber(value: string | null): TypeNumberOption {
  return TYPE_NUMBERS[parseIntegerParam(value, 4, 0, 40)] ?? 4;
}

function parseErrorCorrectionLevel(
  value: string | null,
): ErrorCorrectionLevelOption {
  return ERROR_CORRECTION_LEVELS.includes(value as ErrorCorrectionLevelOption)
    ? value as ErrorCorrectionLevelOption
    : "M";
}

function dataUrlToBytes(dataUrl: string): Uint8Array {
  if (!dataUrl.startsWith(GIF_DATA_URL_PREFIX)) {
    throw new Error("Expected qrcode() to return a GIF data URL");
  }

  return Uint8Array.from(
    atob(dataUrl.slice(GIF_DATA_URL_PREFIX.length)),
    (character) => character.charCodeAt(0),
  );
}

const commonHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, HEAD, OPTIONS",
  "cache-control": "no-store",
};

export async function handleRequest(request: Request): Promise<Response> {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: commonHeaders,
    });
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method not allowed", {
      status: 405,
      headers: {
        ...commonHeaders,
        allow: "GET, HEAD, OPTIONS",
        "content-type": "text/plain; charset=utf-8",
      },
    });
  }

  const url = new URL(request.url);
  const data = url.searchParams.get("data") ?? url.searchParams.get("d") ??
    "Hello World!";
  const size = parseIntegerParam(
    url.searchParams.get("size") ?? url.searchParams.get("s"),
    250,
    100,
    1000,
  );
  const typeNumber = parseTypeNumber(
    url.searchParams.get("typeNumber") ?? url.searchParams.get("v"),
  );
  const errorCorrectLevel = parseErrorCorrectionLevel(
    url.searchParams.get("errorCorrection") ?? url.searchParams.get("e"),
  );

  const dataUrl = await qrcode(data, {
    errorCorrectLevel,
    size,
    typeNumber,
  });
  const gif = dataUrlToBytes(dataUrl);

  return new Response(request.method === "HEAD" ? null : gif, {
    status: 200,
    headers: {
      ...commonHeaders,
      "content-length": String(gif.byteLength),
      "content-type": "image/gif",
    },
  });
}

if (import.meta.main) {
  Deno.serve({ port: 4000 }, handleRequest);
}
