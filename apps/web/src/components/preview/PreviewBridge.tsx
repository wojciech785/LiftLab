import { useEffect } from "react";

/**
 * Connects the page to Hygraph Studio while it runs inside Live Preview:
 * - Click to Edit: elements with data-hygraph-* attributes get an "Edit" overlay
 *   that opens the field in Studio (iframe mode) or a new Studio tab (standalone).
 * - Save sync: when the editor saves in Studio, onSave refetches the draft.
 */
export default function PreviewBridge({ onSave }: { onSave: () => void }) {
  useEffect(() => {
    const endpoint = import.meta.env.VITE_HYGRAPH_ENDPOINT;
    if (!endpoint) { console.warn("Live Preview: set VITE_HYGRAPH_ENDPOINT to enable Click to Edit."); return; }
    let cancelled = false;
    let cleanup = () => {};
    void import("@hygraph/preview-sdk").then(({ Preview }) => {
      if (cancelled) return;
      const preview = new Preview({ endpoint, studioUrl: import.meta.env.VITE_HYGRAPH_STUDIO_URL, sync: { fieldFocus: true } });
      const unsubscribe = preview.subscribe("save", { callback: () => onSave() });
      cleanup = () => { unsubscribe(); preview.destroy(); };
    });
    return () => { cancelled = true; cleanup(); };
  }, [onSave]);
  return <p className="preview-banner" role="status">Preview: showing draft content. Save in Studio to refresh.</p>;
}
