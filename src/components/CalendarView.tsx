import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Market } from '../types';

const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

export default function CalendarView({ markets, initialMonth = '2026-08' }: { markets: Market[]; initialMonth?: string }) {
  const [cursor, setCursor] = useState(() => {
    const [year, month] = initialMonth.split('-').map(Number);
    return new Date(year, month - 1, 1);
  });

  const days = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    const result: { date: Date; current: boolean }[] = [];
    const start = new Date(year, month, 1 - first.getDay());
    for (let i = 0; i < 42; i += 1) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      result.push({ date, current: date.getMonth() === month && date <= last });
    }
    return result;
  }, [cursor]);

  const eventsFor = (date: Date) => {
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return markets.filter((market) => key >= market.startDate && key <= market.endDate);
  };

  return (
    <div className="calendar-shell">
      <div className="calendar-toolbar">
        <div>
          <span className="eyebrow">MONTHLY MARKET</span>
          <h2>{cursor.getFullYear()}년 {cursor.getMonth() + 1}월</h2>
        </div>
        <div className="calendar-buttons">
          <button onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))} aria-label="이전 달"><ChevronLeft /></button>
          <button onClick={() => setCursor(new Date(2026, 7, 1))}>이번 달</button>
          <button onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))} aria-label="다음 달"><ChevronRight /></button>
        </div>
      </div>
      <div className="calendar-grid day-labels">
        {dayNames.map((day) => <div key={day}>{day}</div>)}
      </div>
      <div className="calendar-grid calendar-days">
        {days.map(({ date, current }, index) => {
          const events = eventsFor(date);
          return (
            <div className={`calendar-cell ${current ? '' : 'other-month'}`} key={`${date.toISOString()}-${index}`}>
              <span className="calendar-date">{date.getDate()}</span>
              <div className="calendar-events">
                {events.slice(0, 3).map((event) => (
                  <Link to={`/markets/${event.id}`} key={event.id} className={event.status === 'recruiting' ? 'recruiting' : ''}>
                    <span>{event.title}</span>
                  </Link>
                ))}
                {events.length > 3 && <small>+{events.length - 3}개 더보기</small>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
