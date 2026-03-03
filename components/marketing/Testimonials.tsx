import React from "react";

type Testimonial = {
  name: string;
  location?: string;
  quote: string;
};

const DEFAULTS: Testimonial[] = [
  { name: "Sophie L.", location: "Sydney", quote: "Clear process and fast turnaround. Everything was well tracked." },
  { name: "Daniel Z.", location: "Melbourne", quote: "Professional coordination and predictable timelines." },
  { name: "Emily W.", location: "Brisbane", quote: "Upload flow was simple, and support was responsive when needed." },
];

export function Testimonials({ items = DEFAULTS }: { items?: Testimonial[] }) {
  return (
    <section aria-label="Testimonials">
      <h2 style={{ margin: 0, fontSize: 22, letterSpacing: "-0.02em" }}>Client feedback</h2>
      <div
        style={{
          marginTop: 12,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 12,
        }}
      >
        {items.map((t, i) => (
          <figure
            key={i}
            style={{
              margin: 0,
              padding: 16,
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: 14,
              background: "rgba(255,255,255,0.6)",
            }}
          >
            <blockquote style={{ margin: 0, opacity: 0.85 }}>&ldquo;{t.quote}&rdquo;</blockquote>
            <figcaption style={{ marginTop: 10, fontSize: 13, opacity: 0.75 }}>
              — {t.name}
              {t.location ? `, ${t.location}` : ""}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
