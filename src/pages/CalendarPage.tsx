import { BellRing, Bookmark, CalendarCheck2 } from 'lucide-react';
import CalendarView from '../components/CalendarView';
import { markets } from '../data';

export default function CalendarPage() {
  return (
    <div className="page-wrap">
      <section className="page-hero simple-page-hero">
        <div className="container">
          <span className="eyebrow">MARKET CALENDAR</span>
          <h1>다가오는 일정을<br />달력으로 한눈에.</h1>
          <p>관심등록한 마켓, 셀러 모집 마감과 참여 예정 일정을 같은 달력에서 관리하는 구조로 확장할 수 있습니다.</p>
        </div>
      </section>
      <section className="section section-tight">
        <div className="container">
          <div className="calendar-info-strip">
            <div><CalendarCheck2 /><strong>전체 일정</strong><span>등록된 모든 마켓</span></div>
            <div><Bookmark /><strong>관심 일정</strong><span>저장한 마켓만 보기</span></div>
            <div><BellRing /><strong>알림 일정</strong><span>마감·변경 공지 예정</span></div>
          </div>
          <CalendarView markets={markets} />
        </div>
      </section>
    </div>
  );
}
