import { Bookmark, CalendarDays, CheckCircle2, Heart, MapPin, MessageCircle, Store, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { FeedPost, Market, Seller } from '../types';
import { dDay, koDateRange } from '../lib/date';

export function MarketCard({
  market,
  saved,
  liked,
  onSave,
  onLike,
  compact = false,
}: {
  market: Market;
  saved?: boolean;
  liked?: boolean;
  onSave?: () => void;
  onLike?: () => void;
  compact?: boolean;
}) {
  return (
    <article className={`market-card ${compact ? 'compact' : ''}`}>
      <Link to={`/markets/${market.id}`} className="market-card-image-wrap">
        <img src={market.image} alt={market.title} className="market-card-image" />
        <span className="d-day-badge">{dDay(market.startDate)}</span>
        {market.status === 'recruiting' && <span className="status-badge recruiting">셀러 모집중</span>}
      </Link>
      <div className="market-card-body">
        <div className="market-card-topline">
          <span>{market.category.slice(0, 2).join(' · ')}</span>
          <div className="card-icon-actions">
            {onLike && (
              <button className={liked ? 'active' : ''} onClick={onLike} aria-label="좋아요">
                <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
              </button>
            )}
            {onSave && (
              <button className={saved ? 'active' : ''} onClick={onSave} aria-label="관심 등록">
                <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
              </button>
            )}
          </div>
        </div>
        <Link to={`/markets/${market.id}`}>
          <h3>{market.title}</h3>
        </Link>
        {!compact && <p className="market-summary">{market.summary}</p>}
        <div className="market-meta">
          <span><CalendarDays size={16} />{koDateRange(market.startDate, market.endDate)} · {market.time}</span>
          <span><MapPin size={16} />{market.city} {market.district} · {market.venue}</span>
        </div>
        <div className="market-card-footer">
          <div className="tag-row">
            {market.tags.slice(0, 3).map((tag) => <span className="tag" key={tag}>#{tag}</span>)}
          </div>
          <span className="small-muted">관심 {market.likes.toLocaleString()}</span>
        </div>
      </div>
    </article>
  );
}

export function SellerCard({ seller }: { seller: Seller }) {
  return (
    <article className="seller-card">
      <Link to={`/sellers/${seller.id}`} className="seller-card-image-wrap">
        <img src={seller.image} alt={seller.name} className="seller-card-image" />
      </Link>
      <div className="seller-card-body">
        <div className="seller-title-row">
          <Link to={`/sellers/${seller.id}`}><h3>{seller.name}</h3></Link>
          {seller.verified && <CheckCircle2 size={17} className="verified" aria-label="인증 셀러" />}
        </div>
        <p className="seller-handle">{seller.handle} · {seller.category}</p>
        <p className="seller-intro">{seller.intro}</p>
        <div className="seller-stats">
          <span><Users size={15} /> 팔로워 {seller.followers.toLocaleString()}</span>
          <span><Store size={15} /> 참여 {seller.marketCount}회</span>
        </div>
        <div className="tag-row">
          {seller.specialties.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
        </div>
      </div>
    </article>
  );
}

export function FeedCard({ post, onLike }: { post: FeedPost; onLike?: () => void }) {
  return (
    <article className="feed-card">
      <div className="feed-header">
        <div className="avatar">{post.avatarText}</div>
        <div>
          <strong>{post.author}</strong>
          <span>{post.createdAt} · {post.type}</span>
        </div>
      </div>
      <p className="feed-content">{post.content}</p>
      {post.image && <img src={post.image} alt={`${post.author} 게시물`} className="feed-image" />}
      <div className="tag-row feed-tags">
        {post.tags.map((tag) => <span className="tag" key={tag}>#{tag}</span>)}
      </div>
      <div className="feed-actions">
        <button onClick={onLike}><Heart size={18} /> {post.likes}</button>
        <button><MessageCircle size={18} /> {post.comments}</button>
        <button><Bookmark size={18} /> 저장</button>
      </div>
    </article>
  );
}
