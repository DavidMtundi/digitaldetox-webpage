"use client";

import { Star } from "lucide-react";

export type ReviewItem = {
  name: string;
  role: string;
  quote: string;
  initials: string;
  gradient: string;
  rating?: number;
};

function StarRow({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${i < rating ? "fill-emerald-400 text-emerald-400" : "fill-gray-200 text-gray-200 dark:fill-gray-600 dark:text-gray-600"}`}
          aria-hidden
        />
      ))}
    </div>
  );
}

function ReviewCard({ item }: { item: ReviewItem }) {
  return (
    <article className="review-card group flex w-[min(100%,280px)] shrink-0 snap-start flex-col rounded-2xl border border-emerald-100/80 bg-white/90 p-4 shadow-sm shadow-emerald-900/5 ring-1 ring-gray-200/40 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-emerald-200/90 hover:shadow-md dark:border-gray-700/80 dark:bg-gray-800/90 dark:ring-gray-700/50 dark:hover:border-emerald-700/60 md:w-[300px] md:p-5">
      <StarRow rating={item.rating ?? 5} />
      <p className="review-card-quote mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        &ldquo;{item.quote}&rdquo;
      </p>
      <footer className="mt-4 flex items-center gap-3 border-t border-gray-100 pt-3 dark:border-gray-700/80">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-[11px] font-bold text-white shadow-md ring-2 ring-white dark:ring-gray-800 ${item.gradient}`}
        >
          {item.initials}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">{item.name}</p>
          <p className="truncate text-xs text-gray-500 dark:text-gray-400">{item.role}</p>
        </div>
      </footer>
    </article>
  );
}

export default function ReviewCarousel({
  items,
  label = "Loved by Pauseward users",
  ratingSummary,
}: {
  items: ReviewItem[];
  label?: string;
  ratingSummary?: string;
}) {
  if (!items.length) return null;

  const track = [...items, ...items];

  return (
    <section className="review-carousel-section border-y border-emerald-100/60 bg-gradient-to-b from-white to-emerald-50/30 py-10 md:py-12 dark:border-emerald-900/30 dark:from-gray-900 dark:to-emerald-950/20">
      <div className="container-modern mb-6 flex flex-col items-center gap-2 text-center md:mb-8">
        {ratingSummary ? (
          <div className="flex items-center gap-2">
            <StarRow rating={5} />
            <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">{ratingSummary}</span>
          </div>
        ) : null}
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">{label}</p>
      </div>

      <div className="review-carousel-viewport">
        <div className="review-carousel-track">
          {track.map((item, index) => (
            <ReviewCard key={`${item.name}-${index}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
