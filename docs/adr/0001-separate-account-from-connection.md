# ADR 0001: Separate Account from Connection

## Status

Accepted

## Context

Users interact with external services in two ways:

1. **Sign-in** — proving identity via an OAuth provider (Google in v1).
2. **Data/actions** — pulling data or performing actions through a third-party app (e.g. Google Calendar, Slack).

These look similar on the surface (both involve OAuth tokens to an external service), which raises the question: should they share one model or be kept separate?

## Decision

Account and Connection are separate domain concepts with independent lifecycles.

- **Account** is the linkage between a User and an identity provider, used exclusively for sign-in. Managed by better-auth.
- **Connection** is the linkage between a User and a third-party app for data and actions. Managed by application code (future work).

## Consequences

- A User can revoke a Connection without affecting their ability to sign in, and vice versa.
- Deleting the Google Account (sign-in) does not sever a Google Calendar Connection, and revoking Calendar access does not lock the User out.
- The two models can evolve independently: Accounts follow better-auth's schema; Connections carry app-specific fields (scopes, refresh tokens, sync state).
- The tradeoff is two concepts where one might suffice in a simpler app. We accept this because conflating them risks accidentally severing a User's only sign-in path when they disconnect a data integration.
