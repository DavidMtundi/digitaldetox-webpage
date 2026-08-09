import Link from "next/link";
import type { ReactNode } from "react";

type ServiceUnavailablePanelProps = {
  title?: string;
  message?: string;
  children?: ReactNode;
  showHomeLink?: boolean;
  showContactLink?: boolean;
};

const IS_DEV = process.env.NODE_ENV === "development";

export default function ServiceUnavailablePanel({
  title = "Sign-in temporarily unavailable",
  message = "We're having trouble reaching our servers right now. Please try again in a few minutes.",
  children,
  showHomeLink = true,
  showContactLink = true,
}: ServiceUnavailablePanelProps) {
  return (
    <div className="max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div
        className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400"
        aria-hidden
      >
        <span className="text-xl font-semibold">!</span>
      </div>
      <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h1>
      <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{message}</p>

      {children}

      {IS_DEV ? (
        <p className="mt-4 rounded-lg border border-dashed border-amber-200 bg-amber-50 px-3 py-2 text-left text-xs text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200">
          <strong className="font-semibold">Developer note:</strong> set{" "}
          <code className="text-[11px]">NEXT_PUBLIC_PAUSEWARD_API_URL</code> in{" "}
          <code className="text-[11px]">.env.local</code> (see <code className="text-[11px]">.env.example</code>
          ) and restart the dev server.
        </p>
      ) : null}

      <div className="mt-6 flex flex-col items-center gap-2 text-sm">
        {showHomeLink ? (
          <Link href="/" className="font-medium text-emerald-700 hover:underline dark:text-emerald-400">
            Back to home
          </Link>
        ) : null}
        {showContactLink ? (
          <Link href="/contact" className="text-gray-600 hover:text-emerald-700 dark:text-gray-400 dark:hover:text-emerald-400">
            Contact support
          </Link>
        ) : null}
      </div>
    </div>
  );
}
