"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealOnScrollProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "scale" | "fade";
  once?: boolean;
};

function isInViewport(el: HTMLElement, margin = 24) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  return rect.top < vh - margin && rect.bottom > margin;
}

export default function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  variant = "up",
  once = true,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [init, setInit] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInit(true);
      setVisible(true);
      return;
    }

    setInit(true);

    const show = () => setVisible(true);

    const check = () => {
      if (isInViewport(el)) {
        show();
        return true;
      }
      return false;
    };

    if (check() && once) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(el);

    const onScroll = () => {
      if (check() && once) {
        observer.disconnect();
        window.removeEventListener("scroll", onScroll, { capture: true });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });

    requestAnimationFrame(check);
    const t1 = window.setTimeout(check, 50);
    const t2 = window.setTimeout(check, 300);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll, { capture: true });
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [once]);

  const variantClass =
    variant === "scale" ? "motion-reveal-scale" : variant === "fade" ? "motion-reveal-fade" : "motion-reveal-up";

  return (
    <div
      ref={ref}
      className={`motion-reveal ${variantClass} ${init ? "motion-reveal-init" : ""} ${visible ? "motion-reveal-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
