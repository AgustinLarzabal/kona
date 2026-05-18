import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router"
import { signOut, useSession } from "@kona/auth/client"

import appCss from "@kona/ui/globals.css?url"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Kona",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: () => (
    <main className="container mx-auto p-4 pt-16">
      <h1>404</h1>
      <p>The requested page could not be found.</p>
    </main>
  ),
  shellComponent: RootDocument,
})

function NavLinks() {
  const { data: session, isPending } = useSession()

  if (isPending || !session) return null

  return (
    <>
      <Link to="/apps" className="underline">
        Apps
      </Link>
      <Link to="/settings" className="underline">
        Settings
      </Link>
    </>
  )
}

function SessionControls() {
  const { data: session, isPending } = useSession()

  if (isPending) return null

  if (!session) {
    return (
      <Link to="/login" search={{ redirect: "/" }} className="underline">
        Sign in
      </Link>
    )
  }

  return (
    <>
      <span>Signed in as {session.user.email}</span>
      <button className="underline" onClick={() => signOut()}>
        Sign out
      </button>
    </>
  )
}

function RootComponent() {
  return (
    <>
      <header className="flex items-center justify-end gap-4 border-b px-6 py-3 text-sm">
        <NavLinks />
        <SessionControls />
      </header>
      <Outlet />
    </>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
