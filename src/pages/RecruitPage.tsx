import { ArrowRight, CalendarClock, CheckCircle2, FileText, Filter, Store } from 'lucide-react';
import { Link } from 'react-router-dom';
import { markets } from '../data';
import { dDay, koDateRange } from '../lib/date';

export default function RecruitPage() {
  const recruiting = markets.filter((market) => market.status === 'recruiting');

  return (
    <div className="page-wrap">
      <section className="page-hero recruit-hero">
        <div className="container recruit-hero-grid">
          <div>
            <span className="eyebrow light">SELLER RECRUITMENT</span>
            <h1>나와 잘 맞는 마켓에<br />더 간단하게 지원하세요.</h1>
            <p>셀러 프로필을 한 번 만들어두면 기본정보를 반복해서 작성하지 않아도 됩니다. 모집조건, 지원상태, 발표와 공지를 같은 화면에서 확인하는 구조입니다.</p>
            <div className="hero-quick-links light-links"><span><FileText />프로필 기반 간편지원</span><span><CalendarClock />마감일 알림</span><span><CheckCircle2 />선정상태 관리</span></div>
          </div>
          <img src="/assets/brand-flatlay.webp" alt="플리팅 셀러 브랜드" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading-row">
            <div><span className="eyebrow">OPEN CALLS</span><h2>현재 모집중인 마켓</h2><p>마감일, 참가비와 제공사항을 비교한 뒤 상세페이지에서 지원할 수 있습니다.</p></div>
            <button className="button button-outline"><Filter size={16} />조건 설정</button>
          </div>
          <div className="recruit-card-grid">
            {recruiting.map((market) => (
              <article className="recruit-card" key={market.id}>
                <div className="recruit-card-image"><img src={market.image} alt={market.title} /><span>{dDay(market.recruitingUntil ?? market.startDate)} 마감</span></div>
                <div className="recruit-card-body">
                  <span className="small-muted">{market.city} {market.district} · {market.category.join(' · ')}</span>
                  <h3>{market.title}</h3>
                  <dl><div><dt>행사 일정</dt><dd>{koDateRange(market.startDate, market.endDate)}</dd></div><div><dt>모집 마감</dt><dd>{market.recruitingUntil}</dd></div><div><dt>참가비</dt><dd>{market.fee}</dd></div></dl>
                  <Link to={`/markets/${market.id}`} className="button button-dark full-width">모집 상세·지원 <ArrowRight size={17} /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <div className="section-heading-row"><div><span className="eyebrow">HOW IT WORKS</span><h2>셀러 지원은 이렇게 진행됩니다.</h2></div></div>
          <div className="process-grid">
            <div><span>01</span><Store /><h3>셀러 프로필 등록</h3><p>브랜드 소개, 대표상품, SNS와 온라인몰을 한 번만 등록합니다.</p></div>
            <div><span>02</span><FileText /><h3>행사별 간편지원</h3><p>기본 프로필을 불러오고 행사에 필요한 추가 질문만 답합니다.</p></div>
            <div><span>03</span><CheckCircle2 /><h3>선정·대기 확인</h3><p>결과와 참가비 납부, 운영 공지를 한 화면에서 관리합니다.</p></div>
            <div><span>04</span><CalendarClock /><h3>참여이력 축적</h3><p>현장 체크인 후 참여이력이 생기고 다음 지원에 활용됩니다.</p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container organizer-cta">
          <div><span className="eyebrow">FOR MARKET ORGANIZERS</span><h2>셀러 모집을 직접 시작하시나요?</h2><p>모집 분야와 정원, 참가조건을 설정하고 지원자를 비교·선정하는 주최자 도구로 확장할 예정입니다.</p></div>
          <Link to="/submit-market" className="button button-dark">마켓 등록하기 <ArrowRight size={17} /></Link>
        </div>
      </section>
    </div>
  );
}
