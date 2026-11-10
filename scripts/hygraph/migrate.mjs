/**
 * Plan or apply one numbered migration against an explicit environment.
 *
 *   npm run hygraph:migrate -- 006 --env development            # local plan only
 *   npm run hygraph:migrate -- 006 --env development --apply    # apply to development
 *   npm run hygraph:migrate -- 006 --env master --apply         # promote by replaying
 *
 * --env is mandatory with --apply so nothing reaches master by default.
 */
import { readdir } from "node:fs/promises";
import { Client } from "@hygraph/management-sdk";
import { argValue, environmentEndpoint, managementToken } from "./lib/environment.mjs";

const number = process.argv[2];
const environment = argValue("env");
const apply = process.argv.includes("--apply");
if (!/^\d{3}$/.test(number ?? "")) throw new Error("Usage: migrate.mjs <NNN> --env <environment> [--apply]");
if (apply && !environment) throw new Error("--apply requires an explicit --env.");

const dir = new URL("../../hygraph/schema/", import.meta.url);
const file = (await readdir(dir)).find(name => name.startsWith(`${number}-`) && name.endsWith(".mjs"));
if (!file) throw new Error(`No migration ${number} in hygraph/schema/.`);
const module = await import(new URL(file, dir));
const schedule = Object.values(module).find(value => typeof value === "function");
const name = process.env.HYGRAPH_MIGRATION_NAME || `lift-lab-${file.replace(/\.mjs$/, "")}`;

const client = new Client({
  endpoint: apply ? environmentEndpoint(environment) : "https://plan.invalid/content/plan/plan",
  authToken: apply ? managementToken() : "plan-only",
  name,
});
schedule(client);

if (!apply) {
  console.log(JSON.stringify(client.dryRun(), null, 2));
  console.log(`\nLocal plan for ${file} (${name}); nothing was sent. Re-run with --env <environment> --apply.`);
} else {
  const result = await client.run(true);
  if (result.errors || result.status !== "SUCCESS") throw new Error(result.errors || `Migration status: ${result.status}`);
  console.log(`${name} applied to "${environment}" with status ${result.status}.`);
}
