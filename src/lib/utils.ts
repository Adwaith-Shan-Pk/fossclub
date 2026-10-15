import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export interface MemberSeniorityInfo {
  isOld: boolean;
  totalYears: number;
  earliestYear: number;
}

export function getMemberSeniority(member: { statusHistory?: Array<{ year?: string }> }): MemberSeniorityInfo {
  const uniqueYears = Array.from(
    new Set(
      (member.statusHistory || [])
        .map((h) => h.year?.trim())
        .filter((y): y is string => Boolean(y))
    )
  );

  const totalYears = uniqueYears.length;
  const isOld = totalYears > 1;

  const startYears = uniqueYears
    .map((y) => {
      const match = y.match(/^(\d{4})/);
      return match ? parseInt(match[1], 10) : null;
    })
    .filter((y): y is number => y !== null);

  const earliestYear = startYears.length > 0 ? Math.min(...startYears) : 9999;

  return {
    isOld,
    totalYears,
    earliestYear,
  };
}
