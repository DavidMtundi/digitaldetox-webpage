import Image from "next/image";
import type { PlatformId } from "@/lib/platforms";
import { PLATFORMS } from "@/lib/platforms";

interface PlatformLogoProps {
  platformId: PlatformId;
  size?: number;
  className?: string;
}

export default function PlatformLogo({ platformId, size = 40, className = "" }: PlatformLogoProps) {
  const platform = PLATFORMS.find((entry) => entry.id === platformId);
  if (!platform) return null;

  return (
    <div
      className={`platform-logo ${platform.logoClassName ?? ""} ${className}`.trim()}
      style={{ width: size, height: size }}
    >
      <Image
        src={platform.logoSrc}
        alt={`${platform.name} logo`}
        width={size}
        height={size}
        className="h-full w-full object-contain"
      />
    </div>
  );
}
