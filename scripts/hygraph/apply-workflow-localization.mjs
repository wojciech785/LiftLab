import { Client } from "@hygraph/management-sdk";
import { scheduleWorkflowAndLocalization } from "../../hygraph/schema/002-workflow-and-localization.mjs";

const shouldApply = process.argv.includes("--apply");
const endpoint = process.env.HYGRAPH_SCHEMA_API_ENDPOINT || process.env.HYGRAPH_CONTENT_API_URL;
const authToken = process.env.HYGRAPH_MANAGEMENT_API_TOKEN;
const migrationName = process.env.HYGRAPH_MIGRATION_NAME || "lift-lab-002-workflow-and-localization";

if (!endpoint || !authToken) {
  console.error("Missing Hygraph schema credentials. Set HYGRAPH_MANAGEMENT_API_TOKEN and HYGRAPH_SCHEMA_API_ENDPOINT (or HYGRAPH_CONTENT_API_URL).");
  process.exitCode = 1;
} else {
  const client = new Client({
    endpoint,
    authToken,
    name: migrationName,
  });

  scheduleWorkflowAndLocalization(client);

  if (!shouldApply) {
    console.log(JSON.stringify(client.dryRun(), null, 2));
    console.log("\nDry run only. Re-run with --apply after reviewing the operations.");
  } else {
    const result = await client.run(true);
    if (result.errors) throw new Error(result.errors);
    console.log(`Workflow and localization migration completed with status ${result.status}.`);
  }
}
