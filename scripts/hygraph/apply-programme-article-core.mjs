import { Client } from "@hygraph/management-sdk";
import { scheduleProgrammeAndArticleCore } from "../../hygraph/schema/003-programme-and-article-core.mjs";

const shouldApply = process.argv.includes("--apply");
const endpoint = process.env.HYGRAPH_SCHEMA_API_ENDPOINT || process.env.HYGRAPH_CONTENT_API_URL;
const authToken = process.env.HYGRAPH_MANAGEMENT_API_TOKEN;
const migrationName = process.env.HYGRAPH_MIGRATION_NAME || "lift-lab-003-programme-and-article-core";

if (!endpoint || !authToken) {
  console.error("Missing Hygraph schema credentials. Set HYGRAPH_MANAGEMENT_API_TOKEN and HYGRAPH_SCHEMA_API_ENDPOINT (or HYGRAPH_CONTENT_API_URL).");
  process.exitCode = 1;
} else {
  const client = new Client({ endpoint, authToken, name: migrationName });
  scheduleProgrammeAndArticleCore(client);

  if (!shouldApply) {
    console.log(JSON.stringify(client.dryRun(), null, 2));
    console.log("\nDry run only. Re-run with --apply after reviewing the operations.");
  } else {
    const result = await client.run(true);
    if (result.errors) throw new Error(result.errors);
    console.log(`Programme and article core migration completed with status ${result.status}.`);
  }
}
