export const koDate = (value: string) =>
  new Intl.DateTimeFormat('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  }).format(new Date(`${value}T00:00:00`));

export const koDateRange = (start: string, end: string) => {
  if (start === end) return koDate(start);
  const s = new Date(`${start}T00:00:00`);
  const e = new Date(`${end}T00:00:00`);
  const sf = new Intl.DateTimeFormat('ko-KR', { month: 'long', day: 'numeric' }).format(s);
  const ef = new Intl.DateTimeFormat('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' }).format(e);
  return `${sf}–${ef}`;
};

export const dDay = (date: string) => {
  const now = new Date('2026-07-22T00:00:00');
  const target = new Date(`${date}T00:00:00`);
  const diff = Math.ceil((target.getTime() - now.getTime()) / 86400000);
  return diff <= 0 ? '오늘' : `D-${diff}`;
};
