import { Button } from "@kona/ui/components/button"

export function OAuthSignIn({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="outline" className="w-full" onClick={onClick}>
      Continue with Google
    </Button>
  )
}
