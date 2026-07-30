import RevealOnScroll from "./reveal-on-scroll";

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

export default function TestimonialStrip({
  eyebrow,
  title,
  items,
}: {
  eyebrow?: string;
  title: string;
  items: Testimonial[];
}) {
  return (
    <div>
      {eyebrow && <p className="page-eyebrow">{eyebrow}</p>}
      <h2 className="font-display text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">{title}</h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {items.map((item, i) => (
          <RevealOnScroll key={item.name} delay={i * 100} variant="scale">
            <blockquote
              className="testimonial-card h-full rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800/90 md:p-8"
            >
              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="mt-6 border-t border-gray-100 pt-4 dark:border-gray-700">
                <cite className="not-italic">
                  <span className="block text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {item.name}
                  </span>
                  <span className="mt-0.5 block text-xs text-gray-600 dark:text-gray-400">{item.role}</span>
                </cite>
              </footer>
            </blockquote>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}
