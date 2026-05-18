import { createFileRoute, redirect } from "@tanstack/react-router"
import { signIn } from "@kona/auth/client"
import { OAuthSignIn } from "@/components/oauth-sign-in"
import { getSession } from "@/lib/auth.functions"
import { validateRedirectPath } from "@/lib/redirect"

export const Route = createFileRoute("/(public)/login")({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: validateRedirectPath(search.redirect),
  }),
  beforeLoad: async () => {
    const session = await getSession()
    if (session) {
      throw redirect({ to: "/" })
    }
  },
  component: LoginPage,
})

function LoginPage() {
  const { redirect: callbackURL } = Route.useSearch()

  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <h1 className="text-center text-2xl font-medium">Sign in to Kona</h1>
        <OAuthSignIn
          onClick={() =>
            signIn.social({ provider: "google", callbackURL })
          }
        />
      </div>
    </div>
  )
}
