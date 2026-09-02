import Image from "next/image";

type BrandLogoProps = {
  alt?: string;
  className?: string;
  priority?: boolean;
} & (
  | { fill: true; width?: never; height?: never; sizes?: string }
  | { fill?: false; width: number; height: number; sizes?: never }
);

/** Pauseward app mark — switches between light and dark theme assets. */
export default function BrandLogo({
  alt = "Pauseward",
  className = "",
  priority,
  fill,
  width,
  height,
  sizes,
}: BrandLogoProps) {
  const imageClass = `object-contain ${className}`.trim();

  if (fill) {
    return (
      <>
        <Image
          src="/pauseward-light.png"
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`${imageClass} dark:hidden`}
        />
        <Image
          src="/pauseward.png"
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`${imageClass} hidden dark:block`}
        />
      </>
    );
  }

  return (
    <>
      <Image
        src="/pauseward-light.png"
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={`${imageClass} dark:hidden`}
      />
      <Image
        src="/pauseward.png"
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={`${imageClass} hidden dark:block`}
      />
    </>
  );
}
