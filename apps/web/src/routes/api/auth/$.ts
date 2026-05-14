import { auth } from "@kona/auth/server"
import { createFileRoute } from "@tanstack/react-router"

const handleAuth = async ({ request }: { request: Request }) => {
  return auth.handler(request)
}

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: handleAuth,
      POST: handleAuth,
    },
  },
})
