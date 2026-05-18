# Kona — Shared Glossary

- **OAuth** — Open Authorization. Delegated identity via a third-party provider (Google in v1).
- **User** — A person with a session. Identified by their Google account in v1.
- **Session** — Server-issued, cookie-bound proof that a User is signed in.
- **Account** — The linkage between a User and an external identity provider used for sign-in (identity only — never used for data/actions). One User can have many Accounts; v1 only ever has one Google Account per User.
- **Connection** — The linkage between a User and an external third-party app for data and actions (e.g. Google Calendar, Slack). Distinct from Account: deleting a Connection never affects sign-in, and vice versa. See `docs/adr/0001-separate-account-from-connection.md`.
