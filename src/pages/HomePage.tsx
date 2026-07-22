import { ArrowRight, BellRing, CalendarCheck2, CheckCircle2, Compass, MapPin, Search, Sparkles, Store, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { feedPosts, markets, promoEvents, sellers } from '../data';
import { FeedCard, MarketCard, SellerCard } from '../components/Cards';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const [saved, setSaved] = useLocalStorage<string[]>('fleeting:savedMarkets', []);
  const [liked, setLiked] = useLocalStorage<string[]>('fleeting:likedMarkets', []);

  const toggle = (list: string[], id: string, setter: (value: string[]) => void) => {
    setter(list.includes(id) ? list.filter((item) => item !== id) : [...list, id]);
  };

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(`/markets?q=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <section className="hero-section">
        <img src="/assets/hero-market.webp" alt="도시 플리마켓 풍경" className="hero-background" />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <div className="hero-copy">
            <span className="eyebrow light">FIND · CONNECT · ENJOY</span>
            <img src="/assets/logo-main-transparent.png" alt="플리팅 FLEETING" className="hero-logo" />
            <h1>좋은 취향과 사람,<br />다가오는 마켓을 한곳에서.</h1>
            <p>전국 플리마켓 일정부터 셀러 모집, 참여 셀러의 소식과 온라인몰까지 이어지는 플리마켓 플랫폼입니다.</p>
            <form className="hero-search" onSubmit={submitSearch}>
              <Search size={20} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="지역, 마켓명, 셀러 또는 카테고리 검색" />
              <button type="submit">찾아보기</button>
            </form>
            <div className="hero-quick-links">
              <Link to="/calendar"><CalendarCheck2 size={16} />이번 주 일정</Link>
              <Link to="/recruit"><Store size={16} />셀러 모집중</Link>
              <Link to="/events"><Sparkles size={16} />진행중 이벤트</Link>
            </div>
          </div>
          <div className="hero-side-card">
            <span className="small-kicker">THIS WEEKEND</span>
            <strong>이번 주말, 어디로 갈까요?</strong>
            <p>관심 지역과 취향을 기준으로 지금 가까운 마켓을 골라보세요.</p>
            <div className="hero-side-list">
              {markets.slice(0, 3).map((market) => (
                <Link to={`/markets/${market.id}`} key={market.id}>
                  <span>{market.startDate.slice(5).replace('-', '.')}</span>
                  <div><b>{market.title}</b><small>{market.city} {market.district}</small></div>
                  <ArrowRight size={16} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-tight brand-value-strip">
        <div className="container brand-value-grid">
          <div><Compass /><strong>발견</strong><span>일정과 취향으로 찾는 마켓</span></div>
          <div><Users /><strong>연결</strong><span>주최자·셀러·방문객의 관계</span></div>
          <div><CheckCircle2 /><strong>신뢰</strong><span>공식출처와 참여이력 중심 정보</span></div>
          <div><BellRing /><strong>알림</strong><span>모집 마감과 일정 변경을 놓치지 않게</span></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <span className="eyebrow">UPCOMING MARKETS</span>
              <h2>다가오는 플리마켓</h2>
              <p>날짜와 장소, 참여 셀러와 현장 프로그램까지 미리 확인하세요.</p>
            </div>
            <Link to="/markets" className="text-link">전체 일정 보기 <ArrowRight size={17} /></Link>
          </div>
          <div className="market-grid">
            {markets.slice(0, 3).map((market) => (
              <MarketCard
                key={market.id}
                market={market}
                saved={saved.includes(market.id)}
                liked={liked.includes(market.id)}
                onSave={() => toggle(saved, market.id, setSaved)}
                onLike={() => toggle(liked, market.id, setLiked)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container split-feature">
          <div className="feature-image-wrap">
            <img src="/assets/app-promo.webp" alt="플리팅 서비스 화면" />
          </div>
          <div className="feature-copy">
            <span className="eyebrow">ONE MARKET, ONE PAGE</span>
            <h2>행사 정보가 흩어지지 않도록<br />한 페이지에 정리합니다.</h2>
            <p>장소와 우천정책만 확인하고 끝나는 정보 페이지가 아닙니다. 모집 조건, 참여 확정 셀러, 프로그램, 변경 공지와 후기까지 같은 행사 안에서 이어집니다.</p>
            <ul className="check-list">
              <li><CheckCircle2 />날짜·지도·주차·반려동물·우천정책</li>
              <li><CheckCircle2 />셀러 모집조건과 지원상태 관리</li>
              <li><CheckCircle2 />참여 셀러 SNS·쇼핑몰 바로가기</li>
              <li><CheckCircle2 />관심등록·댓글·캘린더 추가·알림</li>
            </ul>
            <Link to={`/markets/${markets[0].id}`} className="button button-dark">마켓 상세 화면 보기 <ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <span className="eyebrow">SELLER RECRUITMENT</span>
              <h2>지금 셀러를 모집하는 마켓</h2>
              <p>한 번 만든 셀러 프로필로 지원하고, 선정 결과와 공지를 한곳에서 관리합니다.</p>
            </div>
            <Link to="/recruit" className="text-link">모집공고 전체보기 <ArrowRight size={17} /></Link>
          </div>
          <div className="recruit-list">
            {markets.filter((market) => market.status === 'recruiting').slice(0, 4).map((market) => (
              <Link to={`/markets/${market.id}`} key={market.id} className="recruit-row">
                <div className="recruit-date"><span>마감</span><strong>{market.recruitingUntil?.slice(5).replace('-', '.')}</strong></div>
                <div><span className="small-muted">{market.city} {market.district} · {market.category.join(' · ')}</span><h3>{market.title}</h3><p>{market.fee}</p></div>
                <span className="recruit-count">참여 셀러 {market.sellerIds.length}팀 공개</span>
                <ArrowRight />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-ink">
        <div className="container">
          <div className="section-heading-row light-heading">
            <div>
              <span className="eyebrow light">SELLER DIRECTORY</span>
              <h2>마켓이 끝나도<br />셀러와의 연결은 계속됩니다.</h2>
              <p>브랜드 소개와 참여이력, SNS와 온라인몰을 한 프로필에서 확인합니다.</p>
            </div>
            <Link to="/sellers" className="text-link light-link">셀러 전체보기 <ArrowRight size={17} /></Link>
          </div>
          <div className="seller-grid">
            {sellers.slice(0, 4).map((seller) => <SellerCard key={seller.id} seller={seller} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container home-feed-layout">
          <div>
            <div className="section-heading-row compact-heading">
              <div><span className="eyebrow">SELLER FEED</span><h2>셀러의 새 소식</h2></div>
              <Link to="/community" className="text-link">피드 더보기 <ArrowRight size={17} /></Link>
            </div>
            <div className="feed-list">
              {feedPosts.slice(0, 2).map((post) => <FeedCard key={post.id} post={post} />)}
            </div>
          </div>
          <aside className="event-aside">
            <span className="eyebrow">EVENT & BENEFIT</span>
            <h2>이번 달 이벤트</h2>
            {promoEvents.slice(0, 2).map((event) => (
              <Link to="/events" className="mini-event-card" key={event.id}>
                <img src={event.image} alt="" />
                <div><span>{event.badge}</span><h3>{event.title}</h3><p>{event.period}</p></div>
              </Link>
            ))}
            <Link to="/events" className="button button-outline full-width">모든 이벤트 보기</Link>
          </aside>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container organizer-cta">
          <div>
            <span className="eyebrow">FOR ORGANIZERS</span>
            <h2>마켓을 열고 있다면,<br />모집과 홍보를 한 번에 시작하세요.</h2>
            <p>행사 등록, 셀러 지원서 접수, 선정·대기 관리, 라인업 공개와 공지까지 반복 업무를 줄여드립니다.</p>
          </div>
          <div className="organizer-actions">
            <Link to="/submit-market" className="button button-dark">마켓 등록하기 <ArrowRight size={17} /></Link>
            <Link to="/about" className="button button-outline">서비스 구조 살펴보기</Link>
          </div>
        </div>
      </section>

      <section className="section brand-closing-section">
        <div className="container brand-closing">
          <img src="/assets/logo-main-transparent.png" alt="플리팅" />
          <div>
            <span className="eyebrow">CITY MARKET PLATFORM</span>
            <h2>도시의 삶을 더 가볍고<br />가치 있게 연결하는 순간.</h2>
            <p>좋은 마켓을 발견하고, 마음에 드는 셀러를 오래 기억하며, 다음 만남까지 이어지는 경험을 만듭니다.</p>
          </div>
        </div>
      </section>
    </>
  );
}
