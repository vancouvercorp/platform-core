/**
 * Health Check Utility Module
 *
 * Provides system health monitoring and status reporting
 * for the platform-core service.
 *
 * @module health-check
 */

const STATUS_CODES = {
  HEALTHY: 'healthy',
  DEGRADED: 'degraded',
  UNHEALTHY: 'unhealthy',
};

/**
 * Check the health of a given service endpoint.
 *
 * @param {string} endpoint - The URL of the service to check.
 * @param {number} [timeout=5000] - Request timeout in milliseconds.
 * @returns {Promise<{status: string, latency: number, timestamp: string}>}
 */
async function checkEndpoint(endpoint, timeout = 5000) {
  const start = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(endpoint, {
      signal: controller.signal,
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });

    clearTimeout(timer);
    const latency = Date.now() - start;

    if (!response.ok) {
      return {
        status: STATUS_CODES.UNHEALTHY,
        latency,
        timestamp: new Date().toISOString(),
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    return {
      status: latency > 2000 ? STATUS_CODES.DEGRADED : STATUS_CODES.HEALTHY,
      latency,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    clearTimeout(timer);
    return {
      status: STATUS_CODES.UNHEALTHY,
      latency: Date.now() - start,
      timestamp: new Date().toISOString(),
      error: error.message,
    };
  }
}

/**
 * Run health checks against multiple endpoints in parallel.
 *
 * @param {Array<{name: string, endpoint: string}>} services
 * @param {number} [timeout=5000]
 * @returns {Promise<Record<string, {status: string, latency: number, timestamp: string}>>}
 */
async function runAllChecks(services, timeout = 5000) {
  if (!Array.isArray(services) || services.length === 0) {
    throw new Error('services must be a non-empty array');
  }

  const results = {};
  const checks = services.map(async ({ name, endpoint }) => {
    results[name] = await checkEndpoint(endpoint, timeout);
  });

  await Promise.allSettled(checks);
  return results;
}

module.exports = {
  STATUS_CODES,
  checkEndpoint,
  runAllChecks,
};
