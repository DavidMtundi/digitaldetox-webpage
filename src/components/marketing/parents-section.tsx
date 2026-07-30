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
  { step: "1", title: "Install on their device", description: "Android, iOS, Windows, or Mac — under two minutes." },
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
        <div className="parents-showcase-panel">
          <div className="parents-showcase-glow" aria-hidden />
          <div className="parents-showcase-inner">
            <div className="parents-showcase-copy">
              <p className="parents-showcase-eyebrow">For parents</p>
              <h2 className="parents-showcase-title font-display">
                Peace of mind when they&apos;re online
              </h2>
              <p className="parents-showcase-lead">
                Pauseward helps you set boundaries kids can&apos;t easily bypass — blocking harmful content,
                limiting risky apps, and keeping screens off when it matters. You stay in control without
                hovering over every notification.
              </p>

              <ul className="parents-trust-pills" aria-label="Parent trust highlights">
                {TRUST_PILLS.map((pill) => (
                  <li key={pill.label} className="parents-trust-pill">
                    <pill.icon className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
                    {pill.label}
                  </li>
                ))}
              </ul>

              <div className="parents-cta-row">
                <Link href="/pricing" className="parents-cta-primary">
                  See Family pricing
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link href="#download" className="parents-cta-secondary">
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
                  className="parents-phone-frame parents-phone-primary"
                  priority
                />
                <MediaFrame
                  image={analyticsImage}
                  aspect="phone"
                  className="parents-phone-frame parents-phone-secondary hidden sm:block"
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
