export function StepIllustrationCard({
  title,
  caption,
  steps,
}: {
  title: string;
  caption: string;
  steps: string[];
}) {
  return (
    <div className="guide-visual-card guide-step-card">
      <div className="guide-step-rail" aria-hidden="true">
        {steps.slice(0, 3).map((step, index) => (
          <div className="guide-step-node" key={step}>
            <span>{index + 1}</span>
            <strong>{step}</strong>
          </div>
        ))}
      </div>
      <div className="guide-visual-caption">
        <strong>{title}</strong>
        <span>{caption}</span>
      </div>
    </div>
  );
}
