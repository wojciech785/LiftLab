/**
 * Show (and optionally apply) the schema changes that would make --to match --from.
 *
 *   npm run hygraph:diff -- --from development --to master
 *   npm run hygraph:diff -- --from development --to master --apply [--allow-deletes]
 *
 * The diff replaces the target schema with the source: changes made only in the
 * target appear as deletions and can destroy content, so deletions are refused
 * unless --allow-deletes is passed. Renames show up as delete + create.
 * Schema only — content, permissions and webhooks are not compared.
 */
import { Client } from "@hygraph/management-sdk";
import { argValue, environmentEndpoint, managementToken } from "./lib/environment.mjs";

const from = argValue("from");
const to = argValue("to");
if (!from || !to || from === to) throw new Error("Usage: diff-environments.mjs --from <source> --to <target> [--apply] [--allow-deletes]");

const client = new Client({
  endpoint: environmentEndpoint(to),
  authToken: managementToken(),
  name: process.env.HYGRAPH_MIGRATION_NAME || `lift-lab-diff-${from}-to-${to}-${Date.now()}`,
});
const changes = await client.getEnvironmentDiff(from);
const operation = change => Object.keys(change)[0];
const deletes = changes.filter(change => operation(change).startsWith("delete"));

if (!changes.length) {
  console.log(`"${to}" already matches "${from}". Nothing to promote.`);
} else {
  console.log(JSON.stringify(changes, null, 2));
  console.log(`\n${changes.length} change(s) to make "${to}" match "${from}"; ${deletes.length} deletion(s).`);
  if (process.argv.includes("--apply")) {
    if (deletes.length && !process.argv.includes("--allow-deletes")) throw new Error("Refusing to apply deletions without --allow-deletes. Review them first.");
    client.applySchemaChanges(changes);
    const result = await client.run(true);
    if (result.errors || result.status !== "SUCCESS") throw new Error(result.errors || `Migration status: ${result.status}`);
    console.log(`Applied to "${to}" with status ${result.status}.`);
  } else {
    console.log("Review only. Prefer replaying the numbered migration (hygraph:migrate) and re-running this diff to confirm it is empty.");
  }
}
