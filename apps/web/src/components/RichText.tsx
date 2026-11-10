import { Fragment, type ReactNode } from "react";
import type { MediaAsset, RichContent, RichNode } from "@lift-lab/shared-types";

export function safeUrl(value: string | null | undefined, image = false): string | undefined {
  // Reject control characters, whitespace and backslashes before URL parsing.
  // eslint-disable-next-line no-control-regex
  if (!value || /[\u0000-\u0020\u007f\\]/.test(value)) return undefined;
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  if (!image && value.startsWith("#")) return value;
  try { if (["https:", "http:"].includes(new URL(value).protocol)) return value; } catch { /* Render invalid links as text. */ }
  return undefined;
}
function node(n: RichNode, key: number): ReactNode {
  if (typeof n.text === "string") {
    let text: ReactNode = n.text;
    if (n.code) text = <code>{text}</code>;
    if (n.bold) text = <strong>{text}</strong>;
    if (n.italic) text = <em>{text}</em>;
    if (n.underline) text = <u>{text}</u>;
    if (n.strikeThrough) text = <s>{text}</s>;
    return <Fragment key={key}>{text}</Fragment>;
  }
  const children = (n.children ?? []).map(node);
  switch (n.type) {
    case "paragraph": return <p key={key}>{children}</p>;
    case "heading-one": case "heading-two": return <h2 key={key}>{children}</h2>;
    case "heading-three": return <h3 key={key}>{children}</h3>;
    case "heading-four": case "heading-five": case "heading-six": return <h4 key={key}>{children}</h4>;
    case "bulleted-list": return <ul key={key}>{children}</ul>;
    case "numbered-list": return <ol key={key}>{children}</ol>;
    case "list-item": return <li key={key}>{children}</li>;
    case "block-quote": return <blockquote key={key}>{children}</blockquote>;
    case "code-block": return <pre key={key}><code>{children}</code></pre>;
    case "link": return safeUrl(n.href) ? <a key={key} href={safeUrl(n.href)}>{children}</a> : <Fragment key={key}>{children}</Fragment>;
    case "table": return <div key={key} className="table-scroll"><table><tbody>{children}</tbody></table></div>;
    case "table_row": return <tr key={key}>{children}</tr>;
    case "table_cell": return <td key={key}>{children}</td>;
    case "table_header_cell": return <th key={key}>{children}</th>;
    case "image": case "video": case "iframe": case "embed": return <p key={key}>Embedded media is not available in this view.</p>;
    default: return <Fragment key={key}>{children}</Fragment>;
  }
}
export function RichText({value}: {value: RichContent}) {
  return value ? <div className="rich-text">{value.children.map(node)}</div> : null;
}
export function Media({asset, alt}: {asset: MediaAsset | null; alt?: string | null}) {
  const url = safeUrl(asset?.url, true);
  if (!asset || !url || !asset.rightsSource?.trim() || !(alt ?? asset.altText)?.trim()) return <p className="media-placeholder">Image awaiting accessibility and source details.</p>;
  return <figure><img src={url} alt={(alt ?? asset.altText)!} loading="lazy" /><figcaption className="asset-source">Source / rights: {asset.rightsSource}</figcaption></figure>;
}
