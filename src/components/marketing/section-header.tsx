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
  return (
    <div className={`mb-14 md:mb-16 ${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}`}>
      {eyebrow && <p className={`page-eyebrow ${light ? "!text-emerald-300" : ""}`}>{eyebrow}</p>}
      <h2
        className={`font-display text-3xl tracking-tight md:text-4xl lg:text-[2.75rem] lg:leading-[1.1] ${
          light ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-5 text-base leading-relaxed md:text-lg ${light ? "text-emerald-100/85" : "text-gray-600"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
