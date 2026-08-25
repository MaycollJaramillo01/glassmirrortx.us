/**
 * Renders a JSON-LD graph.
 *
 * dangerouslySetInnerHTML is required for a ld+json script tag. The payload is
 * built server-side from our own typed data — never from user input — and `<`
 * is escaped so a string can't break out of the script element.
 */
export function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
  );
}
