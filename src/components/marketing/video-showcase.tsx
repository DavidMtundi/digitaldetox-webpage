"use client";

import Image from "next/image";
import { Play, Smartphone } from "lucide-react";
import { useRef, useState } from "react";
import type { VideoSource } from "@/lib/marketing-media";

type VideoShowcaseProps = {
  source: VideoSource;
  poster?: string;
  title?: string;
  className?: string;
  variant?: "wide" | "phone";
};

export default function VideoShowcase({
  source,
  poster = "/marketing/video-poster.svg",
  title = "Product demo",
  className = "",
  variant = "wide",
}: VideoShowcaseProps) {
  const [active, setActive] = useState(false);
  const [failed, setFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const frameClass =
    variant === "phone"
      ? "product-tour-phone-frame mx-auto w-full max-w-[280px] md:max-w-[300px]"
      : "w-full";

  const aspectClass = variant === "phone" ? "aspect-[9/19]" : "aspect-video";

  if (source.type === "placeholder" && !active) {
    return (
      <PosterPlayShell
        className={`${frameClass} ${className}`}
        aspectClass={aspectClass}
        poster={poster}
        title={title}
        onPlay={() => setActive(true)}
        hint="Add NEXT_PUBLIC_DEMO_VIDEO_URL or pauseward-demo-ios.mp4"
      />
    );
  }

  if (source.type === "placeholder" && active) {
    return <PlaceholderPanel title={title} className={`${frameClass} ${className}`} onClose={() => setActive(false)} />;
  }

  if (source.type === "youtube") {
    return (
      <div className={`media-frame ${aspectClass} overflow-hidden rounded-2xl border border-white/10 shadow-2xl ${frameClass} ${className}`}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${source.id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  if (source.type === "vimeo") {
    return (
      <div className={`media-frame ${aspectClass} overflow-hidden rounded-2xl border border-white/10 shadow-2xl ${frameClass} ${className}`}>
        <iframe
          src={`https://player.vimeo.com/video/${source.id}?autoplay=1`}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  if (source.type === "file") {
    if (!active || failed) {
      return (
        <PosterPlayShell
          className={`${frameClass} ${className}`}
          aspectClass={aspectClass}
          poster={poster}
          title={title}
          onPlay={() => {
            setFailed(false);
            setActive(true);
          }}
          hint={failed ? "Video file not found — run the demo recording script" : "Tap to play the walkthrough"}
          failed={failed}
        />
      );
    }

    return (
      <div
        className={`media-frame relative ${aspectClass} overflow-hidden rounded-[1.75rem] border border-white/15 bg-black shadow-2xl shadow-black/50 ring-1 ring-white/10 ${frameClass} ${className}`}
      >
        <video
          ref={videoRef}
          controls
          playsInline
          poster={source.poster ?? poster}
          className="h-full w-full bg-black object-cover object-top"
          onError={() => setFailed(true)}
          onLoadedData={() => videoRef.current?.play().catch(() => undefined)}
        >
          <source src={source.src} type="video/mp4" />
          Your browser does not support video playback.
        </video>
      </div>
    );
  }

  return null;
}

function PosterPlayShell({
  poster,
  title,
  onPlay,
  className,
  aspectClass,
  hint,
  failed = false,
}: {
  poster: string;
  title: string;
  onPlay: () => void;
  className?: string;
  aspectClass: string;
  hint?: string;
  failed?: boolean;
}) {
  return (
    <div
      className={`relative ${aspectClass} overflow-hidden rounded-[1.75rem] border border-white/15 bg-gray-950 shadow-2xl shadow-black/50 ring-1 ring-white/10 ${className}`}
    >
      <Image src={poster} alt="" fill className="object-cover object-top opacity-80" aria-hidden sizes="300px" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-gray-950/20" />
      <button
        type="button"
        onClick={onPlay}
        className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center transition hover:bg-black/10"
        aria-label={`Play ${title}`}
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-gray-950 shadow-lg shadow-emerald-500/30 transition hover:scale-105">
          <Play className="ml-0.5 h-7 w-7 fill-current" />
        </span>
        <span className="text-sm font-semibold text-white">Watch {title}</span>
        {hint && (
          <span
            className={`max-w-[220px] text-xs leading-relaxed ${failed ? "text-amber-200/90" : "text-white/65"}`}
          >
            {hint}
          </span>
        )}
      </button>
    </div>
  );
}

function PlaceholderPanel({
  title,
  className,
  onClose,
}: {
  title: string;
  className?: string;
  onClose: () => void;
}) {
  return (
    <div
      className={`flex aspect-video flex-col items-center justify-center rounded-2xl border border-dashed border-emerald-700/50 bg-emerald-950/30 p-8 text-center ${className}`}
    >
      <p className="font-display text-xl text-white">Video slot ready</p>
      <p className="mt-2 max-w-sm text-sm text-gray-400">
        Upload a demo to <code className="rounded bg-black/40 px-1.5 py-0.5 text-xs">/public/marketing/pauseward-demo-ios.mp4</code> or set{" "}
        <code className="rounded bg-black/40 px-1.5 py-0.5 text-xs">NEXT_PUBLIC_DEMO_VIDEO_URL</code>.
      </p>
      <button type="button" onClick={onClose} className="btn-secondary mt-6 text-sm">
        Close preview
      </button>
      <p className="mt-4 text-xs text-gray-500">{title}</p>
    </div>
  );
}
