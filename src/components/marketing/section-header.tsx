import RevealOnScroll from "./reveal-on-scroll";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  light?: boolean;
};

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeaderProps) {
  const content = (
    <>
      {eyebrow && <p className={`page-eyebrow ${light ? "!text-emerald-300" : ""}`}>{eyebrow}</p>}
      <h2
        className={`font-display text-[1.625rem] tracking-tight sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-[1.1] ${
          light ? "text-white" : "text-gray-900 dark:text-gray-50"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base leading-relaxed sm:mt-5 md:text-lg ${light ? "text-emerald-100/85" : "text-gray-600 dark:text-gray-400"}`}>
          {subtitle}
        </p>
      )}
    </>
  );

  const wrapperClass = `mb-10 md:mb-14 lg:mb-16 ${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}`;

  if (align === "left") {
    return <div className={wrapperClass}>{content}</div>;
  }

  return <RevealOnScroll className={wrapperClass}>{content}</RevealOnScroll>;
}
