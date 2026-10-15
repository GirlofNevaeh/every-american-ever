import { createServerFn } from "@tanstack/react-start";

export function safeNext(value: string) {
  if (value.length > 300) return "";
  if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) return "";
  if (value.includes("://") || value.includes("\\") || value.includes("\0")) return "";
  if (value === "/" || value.startsWith("/?") || value.startsWith("/#")) return "";
  return value;
}

export const hasAccess = createServerFn({ method: "GET" }).handler(async () => {
  const { passIsValid } = await import("./gate.server");
  return passIsValid();
});

export const enterKey = createServerFn({ method: "POST" })
  .validator((data: { key: string }) => ({ key: String(data?.key ?? "").slice(0, 80) }))
  .handler(async ({ data }) => {
    const { tryUnlock } = await import("./gate.server");
    return tryUnlock(data.key);
  });
