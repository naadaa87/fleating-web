import { Bookmark, CheckCircle2, FileText, Heart, Settings, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MarketCard } from '../components/Cards';
import { markets } from '../data';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function MyPage() {
  const [saved] = useLocalStorage<string[]>('fleeting:savedMarkets', []);
  const [liked] = useLocalStorage<string[]>('fleeting:likedMarkets', []);
  const [applications] = useLocalStorage<Record<string, { brand: string; category: string; note: string }>>('fleeting:applications', {});
  const savedMarkets = markets.filter((market) => saved.includes(market.id));
  const likedMarkets = markets.filter((market) => liked.includes(market.id));

  return (
    <div className="page-wrap mypage-wrap">
      <section className="mypage-hero">
        <div className="container mypage-profile">
          <div className="mypage-avatar"><UserRound /></div>
          <div><span className="eyebrow light">MY FLEETING</span><h1>관심 일정과 지원상태를<br />한곳에서 관리하세요.</h1><p>현재는 로그인 전 시연 화면이며, 저장한 정보는 이 브라우저에만 보관됩니다.</p></div>
          <button className="button button-light"><Settings size={16} />관심 설정</button>
        </div>
      </section>
      <section className="section section-tight">
        <div className="container">
          <div className="mypage-stat-grid"><div><Bookmark /><span>관심 마켓</span><strong>{saved.length}</strong></div><div><Heart /><span>좋아요</span><strong>{liked.length}</strong></div><div><FileText /><span>지원서</span><strong>{Object.keys(applications).length}</strong></div><div><CheckCircle2 /><span>팔로우 셀러</span><strong>0</strong></div></div>
          <section className="mypage-section"><div className="section-heading-row compact-heading"><div><span className="eyebrow">SAVED MARKETS</span><h2>관심등록한 마켓</h2></div></div>{savedMarkets.length ? <div className="market-grid">{savedMarkets.map((market) => <MarketCard key={market.id} market={market} compact />)}</div> : <div className="empty-state"><Bookmark size={32} /><h3>아직 저장한 마켓이 없습니다.</h3><p>가고 싶은 마켓을 관심등록하면 일정과 변경 소식을 모아볼 수 있습니다.</p><Link to="/markets" className="button button-dark">마켓 찾아보기</Link></div>}</section>
          <section className="mypage-section"><div className="section-heading-row compact-heading"><div><span className="eyebrow">APPLICATIONS</span><h2>셀러 지원 현황</h2></div></div>{Object.keys(applications).length ? <div className="application-list">{Object.entries(applications).map(([marketId, application]) => { const market = markets.find((item) => item.id === marketId); return <div key={marketId}><div><span className="status-badge">접수 저장</span><h3>{market?.title ?? '마켓'}</h3><p>{application.brand} · {application.category}</p></div><Link to={`/markets/${marketId}`} className="text-link">상세보기</Link></div>; })}</div> : <div className="empty-state"><FileText size={32} /><h3>저장된 지원서가 없습니다.</h3><p>모집중인 마켓 상세페이지에서 셀러 지원 과정을 체험할 수 있습니다.</p><Link to="/recruit" className="button button-outline">모집공고 보기</Link></div>}</section>
          {likedMarkets.length > 0 && <section className="mypage-section"><div className="section-heading-row compact-heading"><div><span className="eyebrow">LIKED MARKETS</span><h2>좋아요한 마켓</h2></div></div><div className="market-grid">{likedMarkets.map((market) => <MarketCard key={market.id} market={market} compact />)}</div></section>}
        </div>
      </section>
    </div>
  );
}
