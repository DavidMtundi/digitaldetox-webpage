import type { ReactNode } from "react";
import RevealOnScroll from "./reveal-on-scroll";

type MediaSplitProps = {
  children: ReactNode;
  media: ReactNode;
  reverse?: boolean;
  className?: string;
};

/** Two-column section: copy on one side, image or video on the other. */
export default function MediaSplit({ children, media, reverse = false, className = "" }: MediaSplitProps) {
  return (
    <div
      className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${reverse ? "lg:[&>*:first-child]:order-2" : ""} ${className}`}
    >
      <RevealOnScroll className="min-w-0" delay={reverse ? 120 : 0}>
        {children}
      </RevealOnScroll>
      <RevealOnScroll className="min-w-0" delay={reverse ? 0 : 120} variant="scale">
        {media}
      </RevealOnScroll>
    </div>
  );
}
