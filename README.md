# B Bot

The mascot of the RCA Robotics Club — a Slack bot built with Bolt, Socket Mode, and TypeScript.

## Features

### Scheduled Announcements

Sends a recurring message to a configured channel on a cron schedule (e.g. every Thursday at 6 PM). Fully configurable via environment variables.

### Member Onboarding

Listens for users joining a configured channel and immediately sends them an ephemeral welcome message.

### Slash Commands

| Command      | Description                                                                |
| ------------ | -------------------------------------------------------------------------- |
| `/bbot ping` | Check if the bot is alive — responds with `pong` and the current timestamp |
| `/bbot help` | Show all available commands                                                |

## Project Structure

```
src/
├── app.ts                        # Entry point
├── commands/
│   ├── index.ts                  # Registers all commands
│   ├── help.ts                   # /bbot help
│   └── ping.ts                   # /bbot ping
├── listeners/
│   └── member_joined.ts          # Member onboarding
└── schedulers/
    └── reminders.ts              # Weekly announcements
```

## Setup

1. Copy `.env.example` to `.env` and fill in all values.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run in development:
   ```bash
   npm run dev
   ```
