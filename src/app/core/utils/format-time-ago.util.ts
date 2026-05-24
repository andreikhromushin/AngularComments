const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

export function formatTimeAgo(timestamp: number, now: number): string {
  const diff = Math.max(0, now - timestamp);

  if (diff < 45 * SECOND) return "just now";
  if (diff < 90 * SECOND) return "a minute ago";
  if (diff < HOUR) return `${Math.round(diff / MINUTE)}m ago`;
  if (diff < 2 * HOUR) return "an hour ago";

  const days = calendarDayDiff(now, timestamp);
  if (days === 0) return `${Math.round(diff / HOUR)}h ago`;
  if (days === 1) return "yesterday";
  if (diff < WEEK) return `${days}d ago`;

  return new Date(timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function calendarDayDiff(now: number, then: number): number {
  return Math.round((startOfDay(now) - startOfDay(then)) / DAY);
}

function startOfDay(ms: number): number {
  const d = new Date(ms);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}
