/**
 * Shared helpers for schema scripts. Environment endpoints differ only in the
 * last path segment: …/content/<project>/<environment>.
 */
export function argValue(name) {
  const index = process.argv.indexOf(`--${name}`);
  return index === -1 ? undefined : process.argv[index + 1];
}

export function environmentEndpoint(environment) {
  const base = process.env.HYGRAPH_SCHEMA_API_ENDPOINT || process.env.HYGRAPH_CONTENT_API_URL;
  if (!base) throw new Error("Set HYGRAPH_SCHEMA_API_ENDPOINT or HYGRAPH_CONTENT_API_URL.");
  if (!environment) return base;
  if (!/^[a-z][a-z0-9-]*$/.test(environment)) throw new Error(`Invalid environment name: ${environment}`);
  const url = new URL(base);
  url.pathname = url.pathname.replace(/\/[^/]+\/?$/, `/${environment}`);
  return url.toString();
}

export function managementToken() {
  const token = process.env.HYGRAPH_MANAGEMENT_API_TOKEN;
  if (!token) throw new Error("Set HYGRAPH_MANAGEMENT_API_TOKEN (server-only, never the MCP or app tokens).");
  return token;
}
