import Image from "next/image";
import type { MarketingImage } from "@/lib/marketing-media";

type PhoneFanProps = {
  left: MarketingImage;
  center: MarketingImage;
  right: MarketingImage;
};

export default function PhoneFan({ left, center, right }: PhoneFanProps) {
  return (
    <div className="phone-fan relative mx-auto mt-10 max-w-5xl px-2 sm:mt-14 sm:px-4 md:mt-16">
      <div
        className="pointer-events-none absolute inset-x-[12%] bottom-0 top-1/3 rounded-full bg-emerald-400/15 blur-3xl dark:bg-emerald-400/10"
        aria-hidden
      />
      <div className="phone-fan-inner relative flex items-end justify-center gap-2 sm:gap-3 md:gap-5">
        <PhoneSlot image={left} className="phone-fan-left hidden sm:block -rotate-6 md:-rotate-8" size="sm" />
        <PhoneSlot image={center} className="phone-fan-center z-10" size="lg" priority />
        <PhoneSlot image={right} className="phone-fan-right hidden sm:block rotate-6 md:rotate-8" size="sm" />
      </div>
    </div>
  );
}

function PhoneSlot({
  image,
  className = "",
  size = "sm",
  priority = false,
}: {
  image: MarketingImage;
  className?: string;
  size?: "sm" | "lg";
  priority?: boolean;
}) {
  const width =
    size === "lg"
      ? "w-[148px] sm:w-[140px] md:w-[200px] lg:w-[240px]"
      : "w-[100px] md:w-[140px] lg:w-[170px]";

  return (
    <div
      className={`phone-fan-slot relative shrink-0 transition duration-500 hover:-translate-y-2 ${width} ${className}`}
    >
      <div
        className="relative aspect-[9/19] overflow-hidden rounded-[1.5rem] border border-white/15 bg-gray-900 shadow-2xl shadow-black/50 ring-1 ring-white/10 md:rounded-[1.75rem]"
      >
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/30 via-transparent to-white/5" />
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          className="object-cover object-top"
          sizes={size === "lg" ? "240px" : "170px"}
        />
      </div>
    </div>
  );
}
