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
  /** Stack hero actions vertically (CTAs then badges, etc.) */
  childrenLayout?: "row" | "stack";
  /** Dark plug-style hero (default, matches home). Use light for rare legacy layouts. */
  tone?: "dark" | "light";
};

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  media,
  align = "center",
  size = "default",
  childrenLayout = "row",
  tone = "dark",
}: PageHeroProps) {
  const isDark = tone === "dark";
  const isCenter = align === "center" && !media;
  const hasMedia = Boolean(media);

  return (
    <section
      className={`hero-shell relative overflow-hidden border-b ${
        isDark
          ? "hero-shell--dark border-emerald-100/60 bg-[#fafdfb] dark:border-white/10 dark:bg-[#050807]"
          : "border-emerald-100/50 dark:border-gray-800/60"
      } ${size === "compact" ? "py-16 md:py-20" : "py-20 md:py-28 lg:py-32"}`}
    >
      <FocusBackground variant={isDark ? "plug-dark" : "hero"} />
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
            {eyebrow && (
              <p
                className={
                  isDark
                    ? "hero-eyebrow mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/90 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-emerald-800 dark:border-white/15 dark:bg-white/5 dark:text-gray-300 dark:backdrop-blur-sm"
                    : "page-eyebrow"
                }
              >
                {eyebrow}
              </p>
            )}
            <h1
              className={`hero-title font-display ${
                size === "compact" ? "text-4xl md:text-5xl lg:text-[3.25rem]" : "text-[2.75rem] md:text-6xl lg:text-[4.25rem]"
              } leading-[1.05] tracking-tight ${isDark ? "text-gray-900 dark:text-white" : "text-gray-900 dark:text-gray-50"}`}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                className={`hero-subtitle mt-6 text-lg leading-relaxed ${
                  hasMedia ? "max-w-xl" : "max-w-xl"
                } ${isCenter ? "mx-auto" : ""} ${isDark ? "text-gray-600 dark:text-gray-400" : "text-lead"}`}
              >
                {subtitle}
              </p>
            )}
            {children && (
              <div
                className={
                  childrenLayout === "stack"
                    ? `mt-8 flex w-full flex-col gap-5 sm:mt-10 sm:gap-6 ${isCenter && !hasMedia ? "items-center" : "items-start"}`
                    : `mt-10 flex flex-wrap items-center gap-4 ${isCenter ? "justify-center" : ""}`
                }
              >
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
