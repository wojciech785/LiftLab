import type { JSX } from "react";
import { createRoot } from "react-dom/client";
import { Wrapper } from "@hygraph/app-sdk-react";
import { Setup } from "./Setup";
import { ExerciseCheck } from "./ExerciseCheck";
import "./styles.css";

/**
 * One Vite app serves every page Studio embeds, chosen by path:
 *   /setup                  — App Setup URL (shown when the app is installed)
 *   /sidebar/exercise-check — formSidebar element on the Exercise model
 * Outside Studio the SDK cannot connect, so the Wrapper shows the fallback.
 *
 * No <StrictMode>: its double-run effects make the SDK register the same
 * iframe component (zoid tag) twice, and the Studio handshake fails
 * ("Could not connect to …").
 */
const pages: Record<string, () => JSX.Element> = {
  "/setup": Setup,
  "/sidebar/exercise-check": ExerciseCheck,
};
const Page = pages[window.location.pathname];

function Fallback({ state }: { state: string }) {
  if (state === "init") return <p className="muted">Connecting to Hygraph…</p>;
  return <p className="muted">This page only works inside Hygraph Studio (SDK state: {state}).</p>;
}

createRoot(document.getElementById("root")!).render(
  Page ? <Wrapper fallback={Fallback}><Page /></Wrapper>
    : <main><h1>Lift Lab editor tools</h1><p>Pages: <code>/setup</code>, <code>/sidebar/exercise-check</code>. Open them from Hygraph Studio.</p></main>,
);
