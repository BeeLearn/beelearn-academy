import type Streak from "./api/models/streak.model";

export const getWeekStartAndEnd = function () {
  const now = new Date();

  const weekStart = new Date();
  weekStart.setDate(now.getDate() - now.getDay());

  const weekEnd = new Date();
  weekEnd.setDate(now.getDate() + (7 - now.getDay()));

  return [weekStart, weekEnd];
};

export const getMonthStartAndEnd = function () {
  const now = new Date();

  const monthStart = new Date();
  monthStart.setDate(1);

  const monthEnd = new Date(now.getFullYear(), now.getMonth(), 1);
  monthEnd.setMonth(now.getMonth() + 1);

  return [monthStart, monthEnd];
};

export const groupStreaks = function (
  streaks: Streak[],
  predicate: (value: Streak) => boolean
) {
  const groups = [];
  let cursor = null;

  const pick = function (array: Date[]) {
    if (array.length > 0) return [array[0], array[array.length - 1]];
    return array;
  };

  for (const streak of streaks) {
    if (predicate(streak)) {
      if (!cursor) cursor = [];
      cursor.push(new Date(streak.date));
    } else {
      if (cursor && cursor.length > 0) groups.push(pick(cursor));
      cursor = null;
    }
  }

  if (cursor !== null) {
    groups.push(pick(cursor));
  }

  return groups;
};
