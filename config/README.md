# Health Check Configuration

This directory contains configuration files for the platform-core health check system.

## Overview

The health check system monitors critical service dependencies and exposes a `/health` endpoint for load balancers and orchestrators to verify service availability.

## Configuration

See `health_check.json` for the full configuration. Key settings:

| Setting | Value | Description |
|---|---|---|
| `endpoint` | `/health` | HTTP endpoint path |
| `interval_seconds` | `30` | Time between health checks |
| `timeout_seconds` | `5` | Maximum response time per check |
| `retries` | `3` | Number of retry attempts before marking unhealthy |

## Monitored Dependencies

- **database** — Primary database connectivity check
- **cache** — Redis/cache layer availability
- **message_queue** — Message broker connectivity

## Usage

The health check runs automatically based on the configured interval. The endpoint returns:

- `200 OK` — All checks passing
- `503 Service Unavailable` — One or more checks failing

## Contributing

Update `health_check.json` to modify check behavior. Changes require PR review before merging to `main`.
