import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { getCookie, getRequest, setCookie } from "@tanstack/react-start/server";

const cookieName = "eae_pass";
const tasterCode = "EGYPTUSA28";
const tasterCheck = "https://www.everyschoolever.com/api/licence/check";

function readEnv(name: string) {
  const value = process.env[name]?.trim();
  return value && value.length >= 16 ? value : null;
}

function mac(secret: string, message: string) {
  return createHmac("sha256", secret).update(message).digest();
}

function sameText(input: string, expected: string) {
  const left = createHash("sha256").update(input).digest();
  const right = createHash("sha256").update(expected).digest();
  return timingSafeEqual(left, right);
}

function isTasterCode(input: string) {
  return input.toUpperCase().replace(/[^A-Z0-9]/g, "") === tasterCode;
}

function visitorIp() {
  const header = getRequest().headers.get("x-forwarded-for");
  const ip = (header ? header.split(",")[0] : getRequest().headers.get("x-real-ip"))?.trim() ?? "";
  return /^[0-9a-fA-F:.]+$/.test(ip) ? ip : "";
}

function writePass(secret: string, expiresAtSec: number) {
  const exp = String(expiresAtSec);
  const maxAge = Math.max(60, Number(exp) - Math.floor(Date.now() / 1000));
  const sig = mac(secret, `pass:${exp}`).toString("base64url");
  const secure = new URL(getRequest().url).protocol === "https:";
  setCookie(cookieName, `${exp}.${sig}`, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge,
  });
}

export function passIsValid() {
  const secret = readEnv("GATE_SECRET");
  if (!secret) return false;
  const raw = getCookie(cookieName);
  if (!raw) return false;
  const dot = raw.indexOf(".");
  if (dot < 1) return false;
  const exp = raw.slice(0, dot);
  const sig = raw.slice(dot + 1);
  const expNum = Number(exp);
  if (!Number.isFinite(expNum) || expNum < Date.now() / 1000) return false;
  const expected = mac(secret, `pass:${exp}`).toString("base64url");
  return sameText(sig, expected);
}

export async function tryUnlock(key: string) {
  if (!isTasterCode(key)) {
    return { ok: false as const, error: "That key does not work. Check it and try again." };
  }
  const gateSecret = readEnv("GATE_SECRET");
  const relay = readEnv("TASTER_RELAY_SECRET");
  const ip = visitorIp();
  if (!gateSecret || !relay || !ip) {
    return { ok: false as const, error: "This taster cannot be checked just now." };
  }
  const response = await fetch(tasterCheck, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-taster-auth": relay,
      "x-taster-ip": ip,
    },
    body: JSON.stringify({ key: tasterCode, siteId: "american" }),
  });
  const body = (await response.json().catch(() => null)) as { allowed?: boolean; expiresAt?: string; error?: string } | null;
  const expiresAt = body?.expiresAt ? new Date(body.expiresAt).getTime() : 0;
  if (!response.ok || !body?.allowed || !Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
    return {
      ok: false as const,
      error: body?.error || "This taster was already used from this network.",
    };
  }
  writePass(gateSecret, Math.floor(expiresAt / 1000));
  return { ok: true as const };
}
