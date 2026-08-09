import Link from "next/link";
import {
  ArrowRight,
  Ban,
  BookOpen,
  Download,
  EyeOff,
  Lock,
  MessageCircleOff,
  Moon,
  Shield,
  Smartphone,
  Users,
} from "lucide-react";
import MediaFrame from "@/components/marketing/media-frame";
import RevealOnScroll from "@/components/marketing/reveal-on-scroll";
import { marketingMedia } from "@/lib/marketing-media";

const SETUP_STEPS = [
  { step: "1", title: "Install on their device", description: "Phone, computer, or Android TV — under two minutes." },
  { step: "2", title: "Set schedules & blocks", description: "Pick apps, sites, and quiet hours from your dashboard." },
  { step: "3", title: "Sync the whole family", description: "Up to six devices on one Family plan — one set of rules." },
];

const SCENARIOS = [
  {
    icon: MessageCircleOff,
    title: "Less time in toxic feeds",
    description:
      "Harassment often happens on social apps late at night. Schedules limit when those apps are open — without you reading DMs.",
  },
  {
    icon: Ban,
    title: "Harmful sites blocked",
    description:
      "Adult content and risky websites blocked network-wide — harder for kids to bypass than a single browser tab.",
  },
  {
    icon: BookOpen,
    title: "Homework hours protected",
    description: "Keep games and social off during study time. One-tap focus modes for the whole household.",
  },
  {
    icon: Moon,
    title: "Better sleep routines",
    description: "Wind down screens before bed so scrolling doesn’t steal rest — rules that stick overnight.",
  },
];

const TRUST_PILLS = [
  { icon: EyeOff, label: "We don’t read messages" },
  { icon: Lock, label: "Parent PIN on settings" },
  { icon: Smartphone, label: "Up to 6 devices" },
];

const PROTECTION_POINTS = [
  {
    icon: Shield,
    title: "Family dashboard",
    description: "Shared policies and usage trends across every device — you set the rules once.",
  },
  {
    icon: Users,
    title: "Rules that hold",
    description: "Kids can’t uninstall or turn off protection on a shared phone in a moment of impulse.",
  },
];

export default function ParentsSection() {
  const parentsImage = marketingMedia.parents;
  const analyticsImage = marketingMedia.features[1];

  return (
    <div className="parents-showcase">
      <RevealOnScroll>
        <div
          className="parents-showcase-panel relative overflow-hidden rounded-3xl border border-emerald-100/90 bg-white text-gray-900 shadow-xl shadow-emerald-900/5 dark:border-emerald-900/20 dark:bg-gray-950 dark:text-white dark:shadow-2xl dark:shadow-emerald-950/30"
        >
          <div
            className="parents-showcase-glow pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_0%,rgba(16,185,129,0.12),transparent_55%),radial-gradient(ellipse_60%_50%_at_100%_100%,rgba(20,184,166,0.08),transparent_50%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_20%_0%,rgba(16,185,129,0.22),transparent_55%),radial-gradient(ellipse_60%_50%_at_100%_100%,rgba(20,184,166,0.12),transparent_50%)]"
            aria-hidden
          />
          <div className="parents-showcase-inner relative z-10 grid items-center gap-10 p-6 sm:p-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-12 md:p-10 lg:p-12">
            <div className="parents-showcase-copy">
              <p className="parents-showcase-eyebrow text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-400/90">
                For parents
              </p>
              <h2
                className="parents-showcase-title font-display mt-3 text-[1.75rem] leading-[1.1] tracking-tight text-gray-900 sm:text-4xl md:text-[2.5rem] dark:text-white"
              >
                Peaceful evenings when they&apos;re online
              </h2>
              <p className="parents-showcase-lead mt-4 text-base leading-relaxed text-gray-600 sm:mt-5 sm:text-lg dark:text-gray-400">
                Set boundaries kids can&apos;t easily bypass — fewer late-night scrolls, safer browsing, and
                screen time that ends when it should. You stay in control without hovering over every notification.
              </p>

              <ul className="parents-trust-pills mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3" aria-label="Parent trust highlights">
                {TRUST_PILLS.map((pill) => (
                  <li
                    key={pill.label}
                    className="parents-trust-pill inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/80 px-3.5 py-2 text-xs font-medium text-gray-700 backdrop-blur-sm sm:text-sm dark:border-white/12 dark:bg-white/[0.05] dark:text-gray-300"
                  >
                    <pill.icon className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden />
                    {pill.label}
                  </li>
                ))}
              </ul>

              <div className="parents-cta-row mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Link href="/pricing" className="parents-cta-primary inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-gray-950 shadow-lg shadow-emerald-500/25 transition hover:-translate-y-0.5 hover:bg-emerald-400">
                  See Family pricing
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link
                  href="#download"
                  className="parents-cta-secondary inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-emerald-200 bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50 dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:border-white/35 dark:hover:bg-white/10"
                >
                  <Download className="h-4 w-4" aria-hidden />
                  Get the app
                </Link>
              </div>
            </div>

            <div className="parents-showcase-media">
              <div className="parents-phone-duo">
                <MediaFrame
                  image={parentsImage}
                  aspect="phone"
                  className="parents-phone-frame parents-phone-primary [&_.media-frame]:border-gray-200/90 [&_.media-frame]:bg-white [&_.media-frame]:shadow-xl [&_.media-frame]:shadow-emerald-900/10 [&_.media-frame]:ring-emerald-100/80 dark:[&_.media-frame]:border-white/15 dark:[&_.media-frame]:bg-gray-900 dark:[&_.media-frame]:shadow-2xl dark:[&_.media-frame]:shadow-black/40 dark:[&_.media-frame]:ring-white/10"
                  priority
                />
                <MediaFrame
                  image={analyticsImage}
                  aspect="phone"
                  className="parents-phone-frame parents-phone-secondary hidden sm:block [&_.media-frame]:border-gray-200/90 [&_.media-frame]:bg-white [&_.media-frame]:shadow-xl [&_.media-frame]:shadow-emerald-900/10 [&_.media-frame]:ring-emerald-100/80 dark:[&_.media-frame]:border-white/15 dark:[&_.media-frame]:bg-gray-900 dark:[&_.media-frame]:shadow-2xl dark:[&_.media-frame]:shadow-black/40 dark:[&_.media-frame]:ring-white/10"
                />
              </div>
              <p className="parents-media-caption">Family dashboard · schedules · shared policies</p>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={40}>
        <ol className="parents-setup-steps" aria-label="How to set up for your family">
          {SETUP_STEPS.map((item) => (
            <li key={item.step} className="parents-setup-step">
              <span className="parents-setup-num">{item.step}</span>
              <div>
                <p className="parents-setup-title">{item.title}</p>
                <p className="parents-setup-body">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </RevealOnScroll>

      <div className="parents-scenarios-grid">
        {SCENARIOS.map((item, i) => (
          <RevealOnScroll key={item.title} delay={i * 60} variant="scale">
            <article className="parents-scenario-card">
              <div className="parents-scenario-icon">
                <item.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="parents-scenario-title">{item.title}</h3>
              <p className="parents-scenario-body">{item.description}</p>
            </article>
          </RevealOnScroll>
        ))}
      </div>

      <RevealOnScroll delay={120}>
        <div className="parents-bottom-row">
          <div className="parents-protection-cards">
            {PROTECTION_POINTS.map((point) => (
              <div key={point.title} className="parents-protection-card">
                <point.icon className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden />
                <div>
                  <p className="parents-protection-title">{point.title}</p>
                  <p className="parents-protection-body">{point.description}</p>
                </div>
              </div>
            ))}

            <Link href="/pricing" className="parents-family-strip group">
              <div>
                <p className="parents-family-strip-label">Family plan</p>
                <p className="parents-family-strip-title">Cover every device in the house</p>
                <p className="parents-family-strip-body">Shared dashboard, parent PIN, and up to six devices.</p>
              </div>
              <span className="parents-family-strip-cta">
                Compare plans
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          </div>

          <blockquote className="parents-quote-card">
            <p className="parents-quote-text">
              &ldquo;My teens can&apos;t sneak past website blocks anymore. Evening schedules finally stick —
              and I didn&apos;t have to read their messages.&rdquo;
            </p>
            <footer className="parents-quote-footer">
              <span className="parents-quote-avatar">GM</span>
              <div>
                <p className="parents-quote-name">Grace M.</p>
                <p className="parents-quote-role">Parent · Nairobi</p>
              </div>
            </footer>
          </blockquote>
        </div>
      </RevealOnScroll>
    </div>
  );
}
