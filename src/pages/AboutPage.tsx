import { ArrowRight, CalendarDays, CheckCircle2, Link2, ShieldCheck, Store, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="page-wrap">
      <section className="about-hero">
        <div className="container about-hero-grid">
          <div>
            <span className="eyebrow light">ABOUT FLEETING</span>
            <img src="/assets/logo-main-transparent.png" alt="플리팅" className="about-logo" />
            <h1>도시의 삶을 더 가볍고<br />가치 있게 연결하는 순간.</h1>
            <p>플리팅은 흩어진 플리마켓 일정과 셀러 정보를 정리하고, 주최자·셀러·방문객의 관계가 다음 행사까지 이어지도록 만드는 플랫폼입니다.</p>
          </div>
          <img src="/assets/brand-guide.webp" alt="플리팅 브랜드 아이덴티티" />
        </div>
      </section>

      <section className="section">
        <div className="container narrative-grid">
          <div><span className="eyebrow">THE PROBLEM</span><h2>행사는 많지만,<br />정보와 관계는 매번 처음부터 시작됩니다.</h2></div>
          <div className="narrative-copy"><p>일정은 인스타그램과 지자체 공고에 흩어져 있고, 셀러는 행사마다 같은 정보를 다시 작성합니다. 주최자는 지원자를 엑셀과 메시지로 관리하고, 방문객은 참여 셀러를 현장에 도착한 뒤에야 알게 됩니다.</p><p>행사가 끝나면 관심 있던 셀러와 다시 연결되기 어렵고, 주최자의 운영경험과 셀러의 참여이력도 다음 행사에 충분히 활용되지 않습니다.</p></div>
        </div>
      </section>

      <section className="section section-ink">
        <div className="container">
          <div className="section-heading-row light-heading"><div><span className="eyebrow light">OUR SOLUTION</span><h2>행사와 셀러의 관계를<br />하나의 데이터로 연결합니다.</h2></div></div>
          <div className="feature-icon-grid dark-feature-grid"><div><CalendarDays /><h3>정확한 일정</h3><p>공식출처, 최근 수정일과 변경 공지를 기준으로 신뢰할 수 있는 일정을 만듭니다.</p></div><div><Store /><h3>모집과 운영</h3><p>지원서 접수부터 선정, 대기, 공지와 참여이력까지 같은 흐름으로 관리합니다.</p></div><div><Users /><h3>셀러 패스포트</h3><p>브랜드 소개, 대표상품, 외부 채널과 실제 참여이력을 한 프로필에 쌓습니다.</p></div><div><Link2 /><h3>행사 이후의 연결</h3><p>참여 셀러를 팔로우하고 온라인몰과 다음 출점 일정까지 이어집니다.</p></div></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading-row"><div><span className="eyebrow">SERVICE PRINCIPLES</span><h2>플리팅이 지키는 운영 원칙</h2></div></div>
          <div className="principle-list">
            <div><span>01</span><div><h3>정보의 양보다 정확성</h3><p>공식출처, 최근 수정일, 변경 이력과 신고 기능을 중심으로 운영합니다.</p></div></div>
            <div><span>02</span><div><h3>일상 SNS가 아닌 활동 포트폴리오</h3><p>셀러 피드는 출점, 신상품, 제작, 이벤트와 후기 중심으로 구성합니다.</p></div></div>
            <div><span>03</span><div><h3>별점보다 사실 기반 신뢰</h3><p>초기에는 주관적 별점보다 참여이력과 인증, 운영 항목별 후기를 우선합니다.</p></div></div>
            <div><span>04</span><div><h3>작게 시작하고 확장 가능한 구조</h3><p>플리마켓에서 시작해 팝업, 로컬페어, 핸드메이드마켓과 야시장까지 확장합니다.</p></div></div>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container roadmap-section">
          <div><span className="eyebrow">PRODUCT ROADMAP</span><h2>웹에서 시작해<br />운영 플랫폼과 앱으로 확장합니다.</h2><p>현재 파일은 프론트엔드 MVP입니다. 실제 사업화 단계에서는 인증, 데이터베이스, 결제와 앱을 순차적으로 연결할 수 있도록 정보구조를 나누었습니다.</p></div>
          <div className="roadmap-list"><div><CheckCircle2 /><span>1단계</span><strong>일정·상세·셀러 모집·프로필·피드</strong></div><div><ShieldCheck /><span>2단계</span><strong>회원가입·주최자/셀러 인증·관리자 검수</strong></div><div><Store /><span>3단계</span><strong>참가비 결제·취소·환불·정산</strong></div><div><Users /><span>4단계</span><strong>Android/iOS 앱·푸시알림·현장 QR</strong></div></div>
        </div>
      </section>

      <section className="section"><div className="container organizer-cta"><div><span className="eyebrow">START WITH FLEETING</span><h2>좋은 마켓과 셀러가<br />더 오래 기억되는 구조를 만듭니다.</h2></div><div className="organizer-actions"><Link to="/markets" className="button button-dark">마켓 둘러보기 <ArrowRight size={17} /></Link><Link to="/submit-market" className="button button-outline">마켓 등록하기</Link></div></div></section>
    </div>
  );
}
