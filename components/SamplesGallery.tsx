import React from "react";

type SampleItem = {
  title: string;
  note?: string;
};

const DEFAULT_ITEMS: SampleItem[] = [
  { title: "Sample set A", note: "Redacted example (preview)" },
  { title: "Sample set B", note: "Format reference" },
  { title: "Sample set C", note: "Quality standard" },
];

export function SamplesGallery({ items = DEFAULT_ITEMS }: { items?: SampleItem[] }) {
  return (
    <section aria-label="Samples gallery">
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 26, letterSpacing: "-0.02em" }}>Samples</h1>
        <span style={{ fontSize: 13, opacity: 0.7 }}>Examples are redacted for privacy</span>
      </div>

      <div
        style={{
          marginTop: 16,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 12,
        }}
      >
        {items.map((it, idx) => (
          <div
            key={idx}
            style={{
              padding: 16,
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: 14,
              background: "rgba(255,255,255,0.6)",
            }}
          >
            <div style={{ fontWeight: 600 }}>{it.title}</div>
            {it.note ? <div style={{ marginTop: 6, fontSize: 13, opacity: 0.75 }}>{it.note}</div> : null}
          </div>
        ))}
      </div>
    </section>
  );
}

export default SamplesGallery;
