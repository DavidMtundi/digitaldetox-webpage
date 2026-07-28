import Image from "next/image";
import type { MarketingImage } from "@/lib/marketing-media";

type MediaFrameProps = {
  image: MarketingImage;
  aspect?: "phone" | "video" | "wide" | "square";
  priority?: boolean;
  className?: string;
  caption?: string;
  floating?: boolean;
};

const ASPECT = {
  phone: "aspect-[9/19]",
  video: "aspect-video",
  wide: "aspect-[16/10]",
  square: "aspect-square",
} as const;

export default function MediaFrame({
  image,
  aspect = "wide",
  priority = false,
  className = "",
  caption,
  floating = false,
}: MediaFrameProps) {
  return (
    <figure className={`group ${className}`}>
      <div
        className={`media-frame relative overflow-hidden rounded-[1.75rem] border border-white/60 bg-white shadow-2xl shadow-emerald-900/10 ${ASPECT[aspect]} ${
          floating ? "hero-phone-float" : ""
        }`}
      >
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-emerald-950/10 via-transparent to-white/20" />
        <div className="marketing-grain pointer-events-none absolute inset-0 z-[1] opacity-15" />
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          className="object-cover object-top transition duration-700 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      {caption && (
        <figcaption className="mt-4 text-center text-xs text-gray-500">{caption}</figcaption>
      )}
    </figure>
  );
}
