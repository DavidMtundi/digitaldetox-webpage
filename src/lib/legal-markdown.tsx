import Link from "next/link";
import type { ReactElement } from "react";

export function renderLegalMarkdown(content: string): ReactElement {
  const lines = content.split("\n");
  const elements: ReactElement[] = [];
  let currentList: string[] = [];
  let listKey = 0;

  const flushList = () => {
    if (currentList.length === 0) return;
    elements.push(
      <ul key={`list-${listKey++}`} className="list-disc space-y-1 pl-5 text-gray-600">
        {currentList.map((item, index) => (
          <li key={index}>{renderInlineLinks(item)}</li>
        ))}
      </ul>,
    );
    currentList = [];
  };

  lines.forEach((line, index) => {
    if (line.startsWith("### ")) {
      flushList();
      elements.push(
        <h4 key={`subtitle-${index}`} className="font-semibold text-gray-900">
          {line.replace("### ", "")}
        </h4>,
      );
      return;
    }

    if (line.startsWith("- ")) {
      currentList.push(line.replace("- ", ""));
      return;
    }

    if (line.trim() === "") {
      flushList();
      return;
    }

    flushList();
    elements.push(
      <p key={`para-${index}`} className="text-gray-600">
        {renderInlineLinks(line)}
      </p>,
    );
  });

  flushList();
  return <div className="space-y-4">{elements}</div>;
}

function renderInlineLinks(text: string): ReactElement | string {
  const match = text.match(/\[([^\]]+)\]\(([^)]+)\)/);
  if (!match) return text;

  const [full, label, href] = match;
  const [before, after] = text.split(full);
  const isInternal = href.startsWith("/");

  return (
    <>
      {before}
      {isInternal ? (
        <Link href={href} className="font-medium text-emerald-700 hover:underline">
          {label}
        </Link>
      ) : (
        <a href={href} className="font-medium text-emerald-700 hover:underline" target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      )}
      {after}
    </>
  );
}
