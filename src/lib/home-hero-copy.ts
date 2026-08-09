export type TimeOfDay = "morning" | "afternoon" | "evening" | "night";

export type HomeHeroVariant = {
  /** First line of the headline (before the line break). */
  line1: string;
  /** Second line — rendered in emerald accent. */
  accent: string;
  socialProof: string;
  ctaPrimary: string;
};

/** SSR / first paint fallback — safe default before client picks a variant. */
export const DEFAULT_HOME_HERO: HomeHeroVariant = {
  line1: "Stop losing evenings to",
  accent: "apps and sites you didn't mean to open",
  socialProof: "Block distracting apps and websites on phone, laptop, and TV",
  ctaPrimary: "Start tonight's focus",
};

const MORNING_HEROES: HomeHeroVariant[] = [
  {
    line1: "Stop losing your morning to",
    accent: "“just one more scroll”",
    socialProof: "Block apps and feeds before they set the tone for your day",
    ctaPrimary: "Protect this morning",
  },
  {
    line1: "One tab shouldn't",
    accent: "eat your whole morning",
    socialProof: "Cut off news, social, and rabbit holes across every browser",
    ctaPrimary: "Block distracting sites",
  },
  {
    line1: "Win your morning before",
    accent: "notifications and tabs win you",
    socialProof: "Apps and websites blocked — start the day on your terms",
    ctaPrimary: "Start today's focus",
  },
  {
    line1: "Don't let your day start with",
    accent: "a scroll or search spiral",
    socialProof: "Set boundaries on apps and sites now — thank yourself by lunchtime",
    ctaPrimary: "Take back your morning",
  },
];

const AFTERNOON_HEROES: HomeHeroVariant[] = [
  {
    line1: "Stop losing your afternoon to",
    accent: "“just a quick check”",
    socialProof: "Block apps and sites while you work, study, or run errands",
    ctaPrimary: "Protect this afternoon",
  },
  {
    line1: "That article can wait.",
    accent: "Close the rabbit hole first.",
    socialProof: "Website blocks that work in every browser — not just one tab",
    ctaPrimary: "Block distracting sites",
  },
  {
    line1: "Still haven't started?",
    accent: "Block apps and sites first.",
    socialProof: "One tap when focus slips — rules that hold without willpower",
    ctaPrimary: "Start a focus block",
  },
  {
    line1: "Your laptop has tabs.",
    accent: "Pauseward has limits.",
    socialProof: "For afternoons that disappear into feeds, chats, and open tabs",
    ctaPrimary: "Get back on track",
  },
];

const EVENING_HEROES: HomeHeroVariant[] = [
  {
    line1: "Stop losing evenings to",
    accent: "apps and sites you didn't mean to open",
    socialProof: "Block distractions on phone, laptop, and TV — in one place",
    ctaPrimary: "Start tonight's focus",
  },
  {
    line1: "No more “one quick search”",
    accent: "turning into a lost evening",
    socialProof: "Website and app blocks that stick when you're tired",
    ctaPrimary: "Take back tonight",
  },
  {
    line1: "Reclaim the evening",
    accent: "you keep meaning to have",
    socialProof: "Homework, family time, or rest — without another tab spiral",
    ctaPrimary: "Protect tonight",
  },
  {
    line1: "Where did the evening go?",
    accent: "Block the feeds and tabs.",
    socialProof: "For students, parents, and anyone losing hours online",
    ctaPrimary: "Close the rabbit holes",
  },
];

const NIGHT_HEROES: HomeHeroVariant[] = [
  {
    line1: "Stop losing sleep to",
    accent: "one more scroll or search",
    socialProof: "Wind-down rules for apps and sites — tomorrow starts clearer",
    ctaPrimary: "Set tonight's wind-down",
  },
  {
    line1: "Still up on your phone",
    accent: "or laptop at midnight?",
    socialProof: "Bedtime blocks across devices — not just one browser",
    ctaPrimary: "Protect your sleep",
  },
  {
    line1: "Close the day without",
    accent: "feeds and tabs pulling you back",
    socialProof: "Schedules that switch off apps and sites when it matters most",
    ctaPrimary: "Start winding down",
  },
  {
    line1: "“Five more minutes” online",
    accent: "shouldn't cost you sleep",
    socialProof: "Block the sites and apps that keep you up past bedtime",
    ctaPrimary: "Block tonight's distractions",
  },
];

/** Timeless variants — mixed into any period for extra variety. */
const ANYTIME_HEROES: HomeHeroVariant[] = [
  {
    line1: "Stop renting your attention",
    accent: "to apps and sites that don't care",
    socialProof: "Built for people tired of fighting their phone and browser alone",
    ctaPrimary: "Take back your time",
  },
  {
    line1: "Apps. Sites. Tabs.",
    accent: "All blocked when you say so.",
    socialProof: "Focus protection on Android, iOS, Windows, macOS, and TV",
    ctaPrimary: "Get the app",
  },
  {
    line1: "Willpower fades.",
    accent: "Your blocks don't have to.",
    socialProof: "Network-wide website rules plus app shields — harder to bypass",
    ctaPrimary: "Start protecting focus",
  },
];

export const HOME_HERO_BY_TIME: Record<TimeOfDay, HomeHeroVariant[]> = {
  morning: MORNING_HEROES,
  afternoon: AFTERNOON_HEROES,
  evening: EVENING_HEROES,
  night: NIGHT_HEROES,
};

export function getTimeOfDay(hour: number): TimeOfDay {
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 22) return "evening";
  return "night";
}

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]!;
}

const SESSION_HERO_KEY = "pauseward-home-hero-v2";

type CachedHero = {
  period: TimeOfDay;
  variant: HomeHeroVariant;
};

function readSessionHero(date: Date): HomeHeroVariant | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(SESSION_HERO_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw) as CachedHero;
    if (cached.period === getTimeOfDay(date.getHours())) {
      return cached.variant;
    }
  } catch {
    // ignore corrupt cache
  }
  return null;
}

function writeSessionHero(date: Date, variant: HomeHeroVariant): void {
  if (typeof window === "undefined") return;
  try {
    const cached: CachedHero = {
      period: getTimeOfDay(date.getHours()),
      variant,
    };
    sessionStorage.setItem(SESSION_HERO_KEY, JSON.stringify(cached));
  } catch {
    // storage full or private mode
  }
}

/**
 * Picks a hero variant for the visitor's local time.
 * Reuses the same variant within a browser session while the time-of-day period
 * hasn't changed (~75% time-specific, ~25% anytime pool).
 */
export function pickHomeHeroCopy(date = new Date()): HomeHeroVariant {
  const cached = readSessionHero(date);
  if (cached) return cached;

  const period = getTimeOfDay(date.getHours());
  const timePool = HOME_HERO_BY_TIME[period];
  const useAnytime = Math.random() < 0.25;
  const pool = useAnytime ? [...timePool, ...ANYTIME_HEROES] : timePool;
  const variant = pickRandom(pool);
  writeSessionHero(date, variant);
  return variant;
}
