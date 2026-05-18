import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authed/")({ component: Home })

function Home() {
  return (
    <main className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <h1 className="font-medium">Welcome to Kona</h1>
      </div>
    </main>
  )
}
