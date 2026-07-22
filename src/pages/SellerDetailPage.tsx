import { CheckCircle2, ExternalLink, Instagram, MapPin, ShoppingBag, Store, Youtube } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { feedPosts, markets, sellers } from '../data';
import { FeedCard, MarketCard } from '../components/Cards';

export default function SellerDetailPage() {
  const { id } = useParams();
  const seller = sellers.find((item) => item.id === id) ?? sellers[0];
  const sellerMarkets = markets.filter((market) => seller.upcomingMarketIds.includes(market.id));
  const posts = feedPosts.filter((post) => post.sellerId === seller.id);

  return (
    <div className="seller-detail-page">
      <section className="seller-profile-hero">
        <div className="seller-cover"><img src={seller.image} alt="" /></div>
        <div className="container seller-profile-card">
          <div className="seller-profile-avatar">{seller.name.slice(0, 1)}</div>
          <div className="seller-profile-copy">
            <div className="seller-title-row"><h1>{seller.name}</h1>{seller.verified && <CheckCircle2 className="verified" />}</div>
            <p>{seller.handle} · {seller.category}</p>
            <p className="seller-profile-intro">{seller.intro}</p>
            <div className="seller-profile-meta"><span><MapPin />{seller.location}</span><span><Store />마켓 참여 {seller.marketCount}회</span><span>팔로워 {seller.followers.toLocaleString()}</span></div>
          </div>
          <div className="seller-profile-actions"><button className="button button-dark">팔로우</button><button className="button button-outline">문의하기</button></div>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container detail-layout seller-detail-layout">
          <div className="detail-main">
            <section className="detail-section first-section">
              <span className="eyebrow">BRAND CHANNELS</span><h2>공식 채널과 온라인몰</h2>
              <div className="social-link-grid">
                {seller.socials.instagram && <a href={seller.socials.instagram} target="_blank" rel="noreferrer"><Instagram /><div><strong>Instagram</strong><span>작업과 출점 소식</span></div><ExternalLink /></a>}
                {seller.socials.youtube && <a href={seller.socials.youtube} target="_blank" rel="noreferrer"><Youtube /><div><strong>YouTube</strong><span>제작 과정과 브랜드 이야기</span></div><ExternalLink /></a>}
                {seller.socials.tiktok && <a href={seller.socials.tiktok} target="_blank" rel="noreferrer"><span className="text-icon">T</span><div><strong>TikTok</strong><span>짧은 제품 영상</span></div><ExternalLink /></a>}
                {seller.socials.threads && <a href={seller.socials.threads} target="_blank" rel="noreferrer"><span className="text-icon">@</span><div><strong>Threads</strong><span>일상과 작업 기록</span></div><ExternalLink /></a>}
                {seller.socials.shop && <a href={seller.socials.shop} target="_blank" rel="noreferrer"><ShoppingBag /><div><strong>Online Shop</strong><span>온라인 상품 구매</span></div><ExternalLink /></a>}
              </div>
            </section>

            <section className="detail-section"><div className="section-heading-row compact-heading"><div><span className="eyebrow">UPCOMING MARKETS</span><h2>다가오는 출점 일정</h2></div></div><div className="market-grid two-column-grid">{sellerMarkets.slice(0,2).map((market) => <MarketCard key={market.id} market={market} compact />)}</div></section>

            <section className="detail-section"><span className="eyebrow">SELLER FEED</span><h2>브랜드 소식과 활동</h2>{posts.length ? <div className="feed-list">{posts.map((post) => <FeedCard key={post.id} post={post} />)}</div> : <div className="empty-state"><h3>아직 등록된 피드가 없습니다.</h3><p>새 상품과 출점 소식이 올라오면 이곳에 표시됩니다.</p></div>}</section>
          </div>
          <aside className="detail-sidebar"><div className="sticky-card"><span className="eyebrow">SELLER PASSPORT</span><h3>참여이력 기반 프로필</h3><p>플리팅은 단순 별점보다 실제 참여이력과 인증 정보를 우선합니다.</p><div className="passport-stat"><strong>{seller.marketCount}</strong><span>누적 참여 마켓</span></div><div className="trust-row"><CheckCircle2 />본인·브랜드 채널 확인</div><div className="trust-row"><CheckCircle2 />참여이력 공개</div><div className="trust-row"><CheckCircle2 />외부 쇼핑몰 연결</div></div></aside>
        </div>
      </section>
    </div>
  );
}
