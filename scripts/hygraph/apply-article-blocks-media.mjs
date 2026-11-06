import { Client } from "@hygraph/management-sdk";
import { scheduleArticleBlocksAndMedia } from "../../hygraph/schema/004-article-blocks-and-media.mjs";

const shouldApply = process.argv.includes("--apply");
const endpoint = process.env.HYGRAPH_SCHEMA_API_ENDPOINT || process.env.HYGRAPH_CONTENT_API_URL;
const authToken = process.env.HYGRAPH_MANAGEMENT_API_TOKEN;
const migrationName = process.env.HYGRAPH_MIGRATION_NAME || "lift-lab-004-article-blocks-and-media";

if (!endpoint || !authToken) {
  console.error("Missing Hygraph schema credentials. Set HYGRAPH_MANAGEMENT_API_TOKEN and HYGRAPH_SCHEMA_API_ENDPOINT (or HYGRAPH_CONTENT_API_URL).");
  process.exitCode = 1;
} else {
  const client = new Client({ endpoint, authToken, name: migrationName });
  scheduleArticleBlocksAndMedia(client);
  if (!shouldApply) {
    console.log(JSON.stringify(client.dryRun(), null, 2));
    console.log("\nLocal plan only; no server validation. Re-run with --apply after review.");
  } else {
    const result = await client.run(true);
    if (result.errors || result.status !== "SUCCESS") throw new Error(result.errors || `Migration status: ${result.status}`);
    console.log(`Article blocks and media migration completed with status ${result.status}.`);
  }
}
