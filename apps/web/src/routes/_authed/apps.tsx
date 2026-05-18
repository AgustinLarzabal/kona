import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authed/apps")({
  component: AppsPage,
})

function AppsPage() {
  return (
    <main className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <h1 className="font-medium">Apps</h1>
        <p className="text-muted-foreground">
          Connections are coming soon. You'll be able to manage your connected
          third-party apps here.
        </p>
      </div>
    </main>
  )
}
