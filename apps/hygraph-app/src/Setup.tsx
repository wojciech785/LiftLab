import { useApp } from "@hygraph/app-sdk-react";

/**
 * Setup URL page. Studio shows it when someone installs the app in an
 * environment. Marking the installation COMPLETED activates the app's
 * elements there; the app has no settings yet, so config stays empty.
 */
export function Setup() {
  const { installation, context, useUpdateInstallation } = useApp();
  const [update, { loading, error }] = useUpdateInstallation();
  if (installation.status === "COMPLETED") {
    return <main><h1>Lift Lab editor tools</h1>
      <p>Installed in <strong>{context.environment.name}</strong>. Add the <em>Exercise check</em> element to the Exercise model's sidebar (Schema → Exercise → Sidebar).</p></main>;
  }
  return <main><h1>Lift Lab editor tools</h1>
    <p>Adds an <strong>Exercise check</strong> to the Exercise sidebar: per-locale publishing checks that Studio validation does not cover.</p>
    <p>No API permissions are requested: the sidebar only reads the open form.</p>
    <button disabled={loading} onClick={() => void update({ status: "COMPLETED", config: {} })}>{loading ? "Installing…" : "Install app"}</button>
    {error && <p className="bad" role="alert">{error}</p>}</main>;
}
