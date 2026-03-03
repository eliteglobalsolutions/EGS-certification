export type TimelineItem = {
  key: string;
  label: string;
  description: string;
};

export function Timeline({ items, currentIndex }: { items: TimelineItem[]; currentIndex: number }) {
  return (
    <div className="timeline">
      {items.map((item, index) => {
        const state = currentIndex > index ? 'done' : currentIndex === index ? 'active' : '';
        return (
          <div className={`timeline-item ${state}`.trim()} key={item.key}>
            <span className="timeline-dot" />
            <div className="stack-sm">
              <strong>{item.label}</strong>
              <p className="small-text">{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
