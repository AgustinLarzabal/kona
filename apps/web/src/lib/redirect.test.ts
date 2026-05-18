import { describe, expect, it } from "vitest"
import { validateRedirectPath } from "./redirect"

describe("validateRedirectPath", () => {
  it("accepts a valid root-relative path", () => {
    expect(validateRedirectPath("/apps")).toBe("/apps")
  })

  it("accepts the root path", () => {
    expect(validateRedirectPath("/")).toBe("/")
  })

  it("accepts a nested path", () => {
    expect(validateRedirectPath("/settings/profile")).toBe("/settings/profile")
  })

  it("falls back to / for missing value (undefined)", () => {
    expect(validateRedirectPath(undefined)).toBe("/")
  })

  it("falls back to / for non-string value (number)", () => {
    expect(validateRedirectPath(42)).toBe("/")
  })

  it("falls back to / for non-string value (null)", () => {
    expect(validateRedirectPath(null)).toBe("/")
  })

  it("rejects external URLs with a scheme", () => {
    expect(validateRedirectPath("https://evil.com")).toBe("/")
  })

  it("rejects protocol-relative URLs (//evil.com)", () => {
    expect(validateRedirectPath("//evil.com")).toBe("/")
  })

  it("rejects backslash-relative URLs (/\\evil.com)", () => {
    expect(validateRedirectPath("/\\evil.com")).toBe("/")
  })

  it("rejects relative paths without leading slash", () => {
    expect(validateRedirectPath("apps")).toBe("/")
  })

  it("rejects empty string", () => {
    expect(validateRedirectPath("")).toBe("/")
  })
})
