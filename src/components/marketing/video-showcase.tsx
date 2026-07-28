"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";
import type { VideoSource } from "@/lib/marketing-media";

type VideoShowcaseProps = {
  source: VideoSource;
  poster?: string;
  title?: string;
  className?: string;
};

export default function VideoShowcase({
  source,
  poster = "/marketing/video-poster.svg",
  title = "Product demo",
  className = "",
}: VideoShowcaseProps) {
  const [active, setActive] = useState(false);

  if (source.type === "placeholder" && !active) {
    return (
      <div className={`media-frame relative aspect-video overflow-hidden rounded-2xl border border-emerald-100/80 bg-gray-950 shadow-xl ${className}`}>
        <Image src={poster} alt="" fill className="object-cover opacity-90" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/20 to-transparent" />
        <button
          type="button"
          onClick={() => setActive(true)}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white transition hover:bg-black/10"
          aria-label={`Play ${title}`}
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-emerald-800 shadow-lg transition group-hover:scale-105">
            <Play className="ml-1 h-7 w-7 fill-current" />
          </span>
          <span className="text-sm font-medium text-white/90">Watch {title}</span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70 backdrop-blur-sm">
            Add video via NEXT_PUBLIC_DEMO_VIDEO_URL
          </span>
        </button>
      </div>
    );
  }

  if (source.type === "placeholder" && active) {
    return (
      <PlaceholderPanel title={title} className={className} onClose={() => setActive(false)} />
    );
  }

  if (source.type === "youtube") {
    return (
      <div className={`media-frame aspect-video overflow-hidden rounded-2xl border border-emerald-100/80 shadow-xl ${className}`}>
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
      <div className={`media-frame aspect-video overflow-hidden rounded-2xl border border-emerald-100/80 shadow-xl ${className}`}>
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
    return (
      <div className={`media-frame aspect-video overflow-hidden rounded-2xl border border-emerald-100/80 shadow-xl ${className}`}>
        <video
          controls
          autoPlay
          playsInline
          poster={source.poster ?? poster}
          className="h-full w-full bg-black object-cover"
        >
          <source src={source.src} />
          Your browser does not support video playback.
        </video>
      </div>
    );
  }

  return null;
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
      className={`flex aspect-video flex-col items-center justify-center rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/50 p-8 text-center ${className}`}
    >
      <p className="font-display text-xl text-gray-900">Video slot ready</p>
      <p className="mt-2 max-w-sm text-sm text-gray-600">
        Upload a demo to <code className="rounded bg-white px-1.5 py-0.5 text-xs">/public/marketing/demo.mp4</code> or set{" "}
        <code className="rounded bg-white px-1.5 py-0.5 text-xs">NEXT_PUBLIC_DEMO_VIDEO_URL</code> to a YouTube/Vimeo link.
      </p>
      <button type="button" onClick={onClose} className="btn-secondary mt-6 text-sm">
        Close preview
      </button>
      <p className="mt-4 text-xs text-gray-400">{title}</p>
    </div>
  );
}
