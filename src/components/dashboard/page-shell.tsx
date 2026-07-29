import type { ReactNode } from "react";

export function DashboardPage({
  title,
  subtitle,
  children,
  action,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col px-6 py-8 md:px-10">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">{title}</h1>
          {subtitle ? <p className="mt-1 text-gray-600 dark:text-gray-400">{subtitle}</p> : null}
        </div>
        {action}
      </div>
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}

export function DashboardCard({
  title,
  children,
  footer,
  className,
}: {
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`dashboard-card flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 ${className ?? ""}`}
    >
      {title ? (
        <div className="dashboard-card-header border-b border-gray-100 px-5 py-4 dark:border-gray-800">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
        </div>
      ) : null}
      <div className="flex-1 px-5 py-4">{children}</div>
      {footer ? <div className="border-t border-gray-100 px-5 py-3 text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">{footer}</div> : null}
    </section>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="dashboard-empty rounded-xl border border-dashed border-gray-300 bg-white px-6 py-10 text-center dark:border-gray-700 dark:bg-gray-900">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-gray-600 dark:text-gray-400">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
