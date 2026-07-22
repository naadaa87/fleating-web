import { ArrowRight, BellRing, Gift, QrCode, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { promoEvents } from '../data';

export default function EventsPage() {
  return (
    <div className="page-wrap">
      <section className="page-hero event-hero">
        <div className="container event-hero-grid">
          <div><span className="eyebrow light">FLEETING EVENT</span><h1>마켓을 찾는 재미가<br />방문하는 경험까지 이어지도록.</h1><p>관심등록, 현장 체크인과 셀러 팔로우를 기반으로 참여형 이벤트를 운영할 수 있습니다.</p><Link to="/markets" className="button button-light">이번 주 마켓 보기 <ArrowRight size={17} /></Link></div>
          <img src="/assets/city-event.webp" alt="플리팅 마켓 이벤트" />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-heading-row"><div><span className="eyebrow">ONGOING BENEFITS</span><h2>진행중인 이벤트</h2><p>마켓과 셀러를 더 자주 발견할 수 있도록 설계한 참여형 프로그램입니다.</p></div></div>
          <div className="promo-grid">{promoEvents.map((event) => <article className="promo-card" key={event.id}><img src={event.image} alt="" /><div><span className="status-badge">{event.badge}</span><h3>{event.title}</h3><p>{event.description}</p><strong>{event.period}</strong><button className="text-link">{event.cta} <ArrowRight size={16} /></button></div></article>)}</div>
        </div>
      </section>
      <section className="section section-muted">
        <div className="container"><div className="section-heading-row"><div><span className="eyebrow">FUTURE EVENT SYSTEM</span><h2>서비스 확장 시 적용할 이벤트 기능</h2></div></div><div className="feature-icon-grid"><div><QrCode /><h3>현장 QR 체크인</h3><p>실제 방문을 확인하고 후기 작성과 스탬프 적립에 연결합니다.</p></div><div><Gift /><h3>쿠폰·경품 운영</h3><p>주최자와 셀러가 공동 쿠폰, 선착순 혜택과 추첨 이벤트를 만들 수 있습니다.</p></div><div><BellRing /><h3>D-day 맞춤 알림</h3><p>관심 마켓과 팔로우한 셀러의 변경·출점 소식만 골라 알려줍니다.</p></div><div><Sparkles /><h3>취향 기반 추천</h3><p>저장과 방문 기록을 바탕으로 다음 마켓과 셀러를 추천합니다.</p></div></div></div>
      </section>
    </div>
  );
}
