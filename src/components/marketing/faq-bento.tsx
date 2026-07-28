type FaqItem = { q: string; a: string };

export default function FaqBento({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq-bento">
      {items.map((item, i) => (
        <div key={item.q} className="faq-bento-item reveal-up" style={{ animationDelay: `${i * 0.06}s` }}>
          <h3 className="font-semibold text-gray-900">{item.q}</h3>
          <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.a}</p>
        </div>
      ))}
    </div>
  );
}
