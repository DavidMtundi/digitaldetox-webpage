"use client";

import { DashboardPage, EmptyState } from "@/components/dashboard/page-shell";

export default function SchedulesPage() {
  return (
    <DashboardPage
      title="Schedules"
      subtitle="Recurring focus windows that apply blocklists automatically."
    >
      <EmptyState
        title="Schedules are managed on desktop"
        description="Create and edit schedules in the macOS or Windows Pauseward app. Web authoring is coming in a future update."
      />
    </DashboardPage>
  );
}
