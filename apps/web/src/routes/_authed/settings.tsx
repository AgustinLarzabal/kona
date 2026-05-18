import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authed/settings")({
  component: SettingsPage,
})

function SettingsPage() {
  return (
    <main className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <h1 className="font-medium">Settings</h1>
        <p className="text-muted-foreground">
          Settings are coming soon. You'll be able to manage your preferences
          here.
        </p>
      </div>
    </main>
  )
}
