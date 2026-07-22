import { useMemo, useState } from 'react';
import { Bookmark, CalendarPlus, CheckCircle2, Clock, ExternalLink, Heart, MapPin, MessageCircle, PawPrint, Share2, Umbrella, Users } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { markets, sellers } from '../data';
import { dDay, koDateRange } from '../lib/date';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function MarketDetailPage() {
  const { id } = useParams();
  const market = markets.find((item) => item.id === id) ?? markets[0];
  const participating = sellers.filter((seller) => market.sellerIds.includes(seller.id));
  const [saved, setSaved] = useLocalStorage<string[]>('fleeting:savedMarkets', []);
  const [liked, setLiked] = useLocalStorage<string[]>('fleeting:likedMarkets', []);
  const [comments, setComments] = useLocalStorage<Record<string, string[]>>('fleeting:comments', {});
  const [comment, setComment] = useState('');
  const [showApplication, setShowApplication] = useState(false);
  const [applications, setApplications] = useLocalStorage<Record<string, { brand: string; category: string; note: string }>>('fleeting:applications', {});

  const currentComments = useMemo(() => comments[market.id] ?? ['행사 장소와 주차 안내가 한눈에 보여서 좋네요.', '참여 셀러 라인업이 더 추가되면 알림 받고 싶어요.'], [comments, market.id]);
  const toggle = (list: string[], setter: (value: string[]) => void) => setter(list.includes(market.id) ? list.filter((item) => item !== market.id) : [...list, market.id]);

  const addComment = (event: React.FormEvent) => {
    event.preventDefault();
    if (!comment.trim()) return;
    setComments({ ...comments, [market.id]: [...currentComments, comment.trim()] });
    setComment('');
  };

  const submitApplication = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setApplications({
      ...applications,
      [market.id]: {
        brand: String(data.get('brand') ?? ''),
        category: String(data.get('category') ?? ''),
        note: String(data.get('note') ?? ''),
      },
    });
    setShowApplication(false);
  };

  return (
    <div className="detail-page">
      <section className="market-detail-hero">
        <img src={market.image} alt={market.title} />
        <div className="market-detail-overlay" />
        <div className="container market-detail-hero-content">
          <div>
            <div className="tag-row"><span className="status-badge light">{dDay(market.startDate)}</span>{market.status === 'recruiting' && <span className="status-badge recruiting">셀러 모집중</span>}</div>
            <span className="eyebrow light">{market.category.join(' · ')}</span>
            <h1>{market.title}</h1>
            <p>{market.summary}</p>
            <div className="detail-hero-meta"><span><Clock />{koDateRange(market.startDate, market.endDate)} · {market.time}</span><span><MapPin />{market.venue}</span></div>
          </div>
          <div className="detail-action-card">
            <button className={liked.includes(market.id) ? 'active' : ''} onClick={() => toggle(liked, setLiked)}><Heart fill={liked.includes(market.id) ? 'currentColor' : 'none'} /> 좋아요</button>
            <button className={saved.includes(market.id) ? 'active' : ''} onClick={() => toggle(saved, setSaved)}><Bookmark fill={saved.includes(market.id) ? 'currentColor' : 'none'} /> 관심등록</button>
            <button><Share2 /> 공유</button>
            <button><CalendarPlus /> 캘린더 추가</button>
          </div>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container detail-layout">
          <div className="detail-main">
            <nav className="detail-tabs">
              <a href="#info">기본정보</a><a href="#sellers">참여 셀러</a><a href="#program">프로그램</a><a href="#comments">댓글</a>
            </nav>

            <section id="info" className="detail-section">
              <span className="eyebrow">MARKET INFORMATION</span>
              <h2>행사 기본정보</h2>
              <div className="info-grid">
                <div><MapPin /><span>장소</span><strong>{market.venue}</strong><p>{market.address}</p></div>
                <div><Clock /><span>일정</span><strong>{koDateRange(market.startDate, market.endDate)}</strong><p>{market.time}</p></div>
                <div><Umbrella /><span>우천정책</span><strong>{market.rainPolicy}</strong></div>
                <div><PawPrint /><span>반려동물</span><strong>{market.pet}</strong></div>
              </div>
              <a className="button button-outline" target="_blank" rel="noreferrer" href={`https://map.naver.com/p/search/${encodeURIComponent(market.address)}`}>네이버 지도에서 보기 <ExternalLink size={16} /></a>
            </section>

            {market.status === 'recruiting' && (
              <section className="detail-section recruitment-detail">
                <div className="section-heading-row compact-heading">
                  <div><span className="eyebrow">SELLER RECRUITMENT</span><h2>셀러 모집 안내</h2></div>
                  <span className="deadline-label">{market.recruitingUntil} 마감</span>
                </div>
                <div className="recruitment-grid">
                  <div><span>모집 분야</span><strong>{market.category.join(' · ')}</strong></div>
                  <div><span>참가비</span><strong>{market.fee}</strong></div>
                  <div><span>제공 사항</span><strong>기본 테이블 1개, 의자 1개, 공동전기</strong></div>
                  <div><span>선정 발표</span><strong>마감 후 3일 이내 개별 안내</strong></div>
                </div>
                {applications[market.id] ? <div className="application-complete"><CheckCircle2 />지원서가 저장되었습니다. 마이 플리팅에서 내용을 확인할 수 있습니다.</div> : <button className="button button-dark" onClick={() => setShowApplication(true)}>이 마켓에 셀러로 지원하기</button>}
              </section>
            )}

            <section id="sellers" className="detail-section">
              <div className="section-heading-row compact-heading"><div><span className="eyebrow">SELLER LINE-UP</span><h2>참여 확정 셀러</h2><p>마켓에 가기 전 브랜드와 상품을 미리 살펴보세요.</p></div><span className="lineup-count"><Users size={18} /> {participating.length}팀 공개</span></div>
              <div className="lineup-list">
                {participating.map((seller) => (
                  <Link to={`/sellers/${seller.id}`} className="lineup-item" key={seller.id}>
                    <img src={seller.image} alt="" />
                    <div><h3>{seller.name} {seller.verified && <CheckCircle2 size={15} />}</h3><p>{seller.category} · {seller.specialties.join(', ')}</p><span>{seller.handle}</span></div>
                    <ExternalLink />
                  </Link>
                ))}
              </div>
            </section>

            <section id="program" className="detail-section">
              <span className="eyebrow">PROGRAM</span><h2>현장 프로그램</h2>
              <div className="program-list">{market.programs.map((program) => <div key={program.time}><strong>{program.time}</strong><span>{program.title}</span></div>)}</div>
            </section>

            <section id="comments" className="detail-section">
              <span className="eyebrow">COMMUNITY</span><h2>댓글과 궁금한 점</h2>
              <form className="comment-form" onSubmit={addComment}><input value={comment} onChange={(event) => setComment(event.target.value)} placeholder="행사에 대해 궁금한 점이나 기대되는 내용을 남겨주세요." /><button>등록</button></form>
              <div className="comment-list">{currentComments.map((item, index) => <div key={`${item}-${index}`}><div className="avatar">F</div><div><strong>플리팅 사용자</strong><p>{item}</p><button><MessageCircle size={14} /> 답글</button></div></div>)}</div>
            </section>
          </div>

          <aside className="detail-sidebar">
            <div className="sticky-card">
              <span className="eyebrow">ORGANIZER</span><h3>{market.organizer}</h3><p>지난 개최이력과 공지 정확도를 기반으로 주최자 정보를 확장할 예정입니다.</p>
              <div className="trust-row"><CheckCircle2 /> 공식출처 확인</div><div className="trust-row"><CheckCircle2 /> 최근 정보 업데이트</div>
              <button className="button button-outline full-width">주최자 팔로우</button>
            </div>
            <div className="sticky-card muted-card"><strong>행사 변경 알림</strong><p>우천, 장소 변경, 셀러 라인업 추가 소식을 놓치지 않도록 관심등록해 두세요.</p><button className="button button-dark full-width" onClick={() => !saved.includes(market.id) && setSaved([...saved, market.id])}>알림 받을 마켓으로 저장</button></div>
          </aside>
        </div>
      </section>

      {showApplication && (
        <div className="modal-backdrop" onClick={() => setShowApplication(false)}>
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            <span className="eyebrow">SELLER APPLICATION</span><h2>{market.title} 지원</h2><p>현재는 프론트엔드 시연용으로 브라우저에만 저장됩니다. 실제 서비스에서는 회원 프로필과 자동 연동됩니다.</p>
            <form onSubmit={submitApplication} className="stack-form">
              <label>브랜드명<input name="brand" required placeholder="브랜드명을 입력하세요" /></label>
              <label>판매 카테고리<input name="category" required placeholder="예: 생활도자, 문구" /></label>
              <label>간단한 소개<textarea name="note" required rows={4} placeholder="대표 상품과 이번 마켓에서 소개할 내용을 적어주세요." /></label>
              <div className="modal-actions"><button type="button" className="button button-outline" onClick={() => setShowApplication(false)}>취소</button><button className="button button-dark">지원서 저장</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
