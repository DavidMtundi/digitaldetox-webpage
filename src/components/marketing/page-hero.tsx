import type { ReactNode } from "react";
import FocusBackground from "./focus-background";

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
  media?: ReactNode;
  align?: "center" | "left";
  size?: "default" | "compact";
};

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  media,
  align = "center",
  size = "default",
}: PageHeroProps) {
  const isCenter = align === "center" && !media;
  const hasMedia = Boolean(media);

  return (
    <section
      className={`hero-shell relative overflow-hidden border-b border-emerald-100/50 dark:border-gray-800/60 ${
        size === "compact" ? "py-16 md:py-20" : "py-20 md:py-28 lg:py-32"
      }`}
    >
      <FocusBackground variant="hero" />
      <div className="container-modern relative z-10">
        <div
          className={
            hasMedia
              ? "grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 xl:gap-20"
              : isCenter
                ? "text-center"
                : ""
          }
        >
          <div className={`hero-enter ${isCenter ? "mx-auto max-w-4xl" : "max-w-2xl"}`}>
            {eyebrow && <p className="page-eyebrow">{eyebrow}</p>}
            <h1
              className={`font-display ${
                size === "compact" ? "text-4xl md:text-5xl lg:text-[3.25rem]" : "text-[2.75rem] md:text-6xl lg:text-[4.25rem]"
              } leading-[1.05] tracking-tight text-gray-900 dark:text-gray-50`}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                className={`text-lead mt-6 max-w-xl ${isCenter ? "mx-auto" : ""}`}
              >
                {subtitle}
              </p>
            )}
            {children && (
              <div className={`mt-10 flex flex-wrap gap-4 ${isCenter ? "justify-center" : ""}`}>
                {children}
              </div>
            )}
          </div>

          {media && (
            <div className="hero-media-wrap hero-enter hero-enter-delay-2 mx-auto w-full max-w-[320px] lg:max-w-none lg:justify-self-end">
              {media}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
