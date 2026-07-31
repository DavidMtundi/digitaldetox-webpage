/** Overlapping avatar stack for hero social proof (27Plug-style). */
export default function SocialProofAvatars({
  count,
  label,
  text,
}: {
  count?: string;
  label?: string;
  /** When set, replaces the default "Join {count} {label}" line */
  text?: string;
}) {
  const avatars = [
    { bg: "from-emerald-400 to-teal-500", initials: "AK" },
    { bg: "from-teal-400 to-cyan-500", initials: "JO" },
    { bg: "from-lime-400 to-emerald-500", initials: "GM" },
    { bg: "from-emerald-500 to-green-600", initials: "MN" },
  ];

  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
      <div className="flex -space-x-2.5">
        {avatars.map((avatar, i) => (
          <div
            key={avatar.initials}
            className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br text-[10px] font-bold text-white shadow-md dark:border-gray-950 ${avatar.bg}`}
            style={{ zIndex: avatars.length - i }}
          >
            {avatar.initials}
          </div>
        ))}
      </div>
      <p className="hero-social-proof max-w-[min(100%,18rem)] text-center text-sm leading-snug text-gray-600 dark:text-gray-400 sm:max-w-none sm:text-left">
        {text ?? (
          <>
            Join <span className="hero-social-proof-emphasis font-semibold text-gray-900 dark:text-white">{count}</span> {label}
          </>
        )}
      </p>
    </div>
  );
}
