import { describe, expect, it } from "vitest"
import { getTestInstance } from "better-auth/test"

describe("@kona/auth server", () => {
  it("creates a session on sign-in", async () => {
    const { client, signInWithTestUser } = await getTestInstance({
      socialProviders: {
        google: {
          clientId: "test-google-client-id",
          clientSecret: "test-google-client-secret",
        },
      },
    })

    const { headers } = await signInWithTestUser()
    const { data: session } = await client.getSession({
      fetchOptions: { headers },
    })
    expect(session?.session).toBeTruthy()
    expect(session?.user.email).toBe("test@test.com")
  })

  it("retrieves an active session", async () => {
    const { client, signInWithTestUser } = await getTestInstance()

    const { headers } = await signInWithTestUser()
    const { data: session } = await client.getSession({
      fetchOptions: { headers },
    })

    expect(session?.user.email).toBe("test@test.com")
    expect(session?.session).toBeTruthy()
  })

  it("invalidates session on sign-out", async () => {
    const { client, signInWithTestUser } = await getTestInstance()

    const { headers } = await signInWithTestUser()
    await client.signOut({ fetchOptions: { headers } })

    const { data: session } = await client.getSession({
      fetchOptions: { headers },
    })
    expect(session).toBeNull()
  })

  it("registers google as a social provider", async () => {
    const { auth } = await getTestInstance({
      socialProviders: {
        google: {
          clientId: "test-google-client-id",
          clientSecret: "test-google-client-secret",
        },
      },
    })

    expect(auth.options.socialProviders?.google).toBeDefined()
    expect(auth.options.socialProviders?.google?.clientId).toBe(
      "test-google-client-id"
    )
  })
})
