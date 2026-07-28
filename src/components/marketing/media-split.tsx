import type { ReactNode } from "react";

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
      <div className="min-w-0">{children}</div>
      <div className="min-w-0">{media}</div>
    </div>
  );
}
