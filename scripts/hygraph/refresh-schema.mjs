import { writeFile } from "node:fs/promises";
import { buildClientSchema, getIntrospectionQuery, lexicographicSortSchema, printSchema } from "graphql";

const endpoint = process.env.HYGRAPH_CONTENT_API_URL;
const token = process.env.HYGRAPH_CONTENT_API_TOKEN;
if (!endpoint || !token) throw new Error("Set HYGRAPH_CONTENT_API_URL and HYGRAPH_CONTENT_API_TOKEN to refresh the schema.");
const response = await fetch(endpoint, {
  method: "POST", headers: {"Content-Type":"application/json",Authorization:`Bearer ${token}`},
  body: JSON.stringify({query:getIntrospectionQuery()}),signal:AbortSignal.timeout(30000),
});
if (!response.ok) throw new Error(`Schema introspection failed (${response.status}).`);
const result = await response.json();
if (result.errors?.length || !result.data) throw new Error("Schema introspection failed; check read-token permissions.");
const schema = lexicographicSortSchema(buildClientSchema(result.data));
await writeFile(new URL("../../apps/api/src/hygraph/schema.graphql",import.meta.url),printSchema(schema).replace(/[\t ]+$/gm, "")+"\n");
console.log("Refreshed Hygraph schema metadata. No entries, credentials, or endpoint URL were saved.");
