import { Client } from "@hygraph/management-sdk";
import { scheduleWorkoutIntents } from "../../hygraph/schema/005-workout-intents.mjs";

const endpoint = process.env.HYGRAPH_SCHEMA_API_ENDPOINT || process.env.HYGRAPH_CONTENT_API_URL;
const authToken = process.env.HYGRAPH_MANAGEMENT_API_TOKEN;
if (!endpoint || !authToken) throw new Error("Set HYGRAPH_MANAGEMENT_API_TOKEN and HYGRAPH_SCHEMA_API_ENDPOINT (or HYGRAPH_CONTENT_API_URL).");
const client = new Client({endpoint,authToken,name:process.env.HYGRAPH_MIGRATION_NAME || "lift-lab-005-workout-intents"});
scheduleWorkoutIntents(client);
if (!process.argv.includes("--apply")) {
  console.log(JSON.stringify(client.dryRun(),null,2));
  console.log("Local plan only; no server validation. Use --apply after review.");
} else {
  const result = await client.run(true);
  if (result.errors || result.status !== "SUCCESS") throw new Error(result.errors || `Migration status: ${result.status}`);
  console.log("Workout intent migration completed with status SUCCESS.");
}
