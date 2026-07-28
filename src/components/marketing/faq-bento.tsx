import RevealOnScroll from "./reveal-on-scroll";

type FaqItem = { q: string; a: string };

export default function FaqBento({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq-bento">
      {items.map((item, i) => (
        <RevealOnScroll key={item.q} delay={i * 60}>
          <div className="faq-bento-item">
            <h3 className="font-semibold text-gray-900">{item.q}</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.a}</p>
          </div>
        </RevealOnScroll>
      ))}
    </div>
  );
}
