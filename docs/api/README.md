# API Documentation

## Overview

This directory contains documentation for the Platform Core API endpoints.

## Standards

All API endpoints must be documented with the following:

- **Endpoint URL** — Full path including version prefix (e.g., `/v1/resource`)
- **HTTP Method** — GET, POST, PUT, PATCH, DELETE
- **Authentication** — Required auth type (Bearer token, API key, etc.)
- **Request Parameters** — Path params, query params, and body schema
- **Response Schema** — Success and error response formats with examples
- **Rate Limits** — Applicable rate limit tiers and headers
- **Error Codes** — Possible error codes and their meanings

## Rate Limiting

As of our latest update, rate limiting is enforced at the API gateway level. Endpoints return the following headers:

| Header | Description |
|--------|-------------|
| `X-RateLimit-Limit` | Maximum requests allowed in the window |
| `X-RateLimit-Remaining` | Requests remaining in the current window |
| `X-RateLimit-Reset` | Timestamp when the rate limit window resets |

## Contributing

When adding new endpoints, please update the corresponding doc file in this directory and ensure all fields listed above are covered.

## Directory Structure

```
docs/api/
├── README.md
├── auth.md
├── users.md
├── resources.md
└── webhooks.md
```
