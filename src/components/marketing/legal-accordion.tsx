"use client";

import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

export type LegalSection = {
  id: string;
  title: string;
  icon?: ReactNode;
  content: ReactNode;
};

export default function LegalAccordion({
  sections,
  openSections,
  onToggle,
}: {
  sections: LegalSection[];
  openSections: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="space-y-3">
      {sections.map((section) => {
        const open = openSections[section.id];
        return (
          <div key={section.id} className="legal-accordion-item glass-card !rounded-2xl !p-0 overflow-hidden">
            <button
              type="button"
              onClick={() => onToggle(section.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={open}
            >
              <span className="flex items-center gap-3">
                {section.icon && <span className="text-emerald-600">{section.icon}</span>}
                <span className="font-semibold text-gray-900">{section.title}</span>
              </span>
              <ChevronDown className={`h-5 w-5 shrink-0 text-gray-400 transition ${open ? "rotate-180" : ""}`} />
            </button>
            {open && <div className="border-t border-gray-100 px-5 py-5 text-gray-600 prose-legal">{section.content}</div>}
          </div>
        );
      })}
    </div>
  );
}
