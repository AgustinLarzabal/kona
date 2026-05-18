export function validateRedirectPath(value: unknown): string {
  if (typeof value !== "string") return "/"
  if (!value.startsWith("/")) return "/"
  if (value.startsWith("//")) return "/"
  if (value.startsWith("/\\")) return "/"
  return value
}
