import { ImagePlus, PenLine, Send, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { FeedCard } from '../components/Cards';
import { feedPosts } from '../data';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { FeedPost } from '../types';

export default function CommunityPage() {
  const [userPosts, setUserPosts] = useLocalStorage<FeedPost[]>('fleeting:userPosts', []);
  const [content, setContent] = useState('');
  const [type, setType] = useState<FeedPost['type']>('출점소식');
  const allPosts = [...userPosts, ...feedPosts];

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!content.trim()) return;
    setUserPosts([
      {
        id: `user-${Date.now()}`,
        author: '나의 브랜드',
        avatarText: '나',
        createdAt: '방금 전',
        type,
        content: content.trim(),
        likes: 0,
        comments: 0,
        tags: [type],
      },
      ...userPosts,
    ]);
    setContent('');
  };

  return (
    <div className="page-wrap">
      <section className="page-hero community-hero">
        <div className="container community-hero-grid">
          <div><span className="eyebrow light">SELLER COMMUNITY</span><h1>일상보다 브랜드의 활동이<br />잘 보이는 피드.</h1><p>출점, 신상품, 제작과정, 현장이벤트와 후기를 중심으로 셀러의 활동을 차곡차곡 기록합니다.</p></div>
          <img src="/assets/community-market.webp" alt="셀러와 방문객이 만나는 플리마켓" />
        </div>
      </section>
      <section className="section section-tight">
        <div className="container community-layout">
          <div>
            <form className="post-composer" onSubmit={submit}>
              <div className="composer-header"><div className="avatar">나</div><strong>새 소식을 알려주세요.</strong></div>
              <textarea value={content} onChange={(event) => setContent(event.target.value)} placeholder="다음 출점 일정, 새 상품, 제작 이야기나 현장 이벤트를 작성해보세요." rows={4} />
              <div className="composer-footer">
                <div className="composer-tools"><button type="button"><ImagePlus />사진</button><button type="button"><PenLine />글쓰기</button><select value={type} onChange={(event) => setType(event.target.value as FeedPost['type'])}><option>출점소식</option><option>신상품</option><option>제작기록</option><option>이벤트</option><option>후기</option></select></div>
                <button className="button button-dark" type="submit"><Send size={16} />게시하기</button>
              </div>
            </form>
            <div className="feed-filter-tabs"><button className="active">추천</button><button>팔로잉</button><button>출점소식</button><button>신상품</button><button>이벤트</button></div>
            <div className="feed-list">{allPosts.map((post) => <FeedCard key={post.id} post={post} />)}</div>
          </div>
          <aside className="community-sidebar">
            <div className="sticky-card"><span className="eyebrow">FEED GUIDE</span><h3>이런 소식이 잘 어울립니다.</h3><ul className="plain-list"><li>다음 출점 일정과 준비 상품</li><li>신상품·재입고·온라인몰 소식</li><li>제작과정과 작업실 기록</li><li>현장 쿠폰과 팔로우 이벤트</li><li>마켓을 마친 뒤의 후기</li></ul></div>
            <div className="sticky-card muted-card"><Sparkles /><h3>이번 주 인기 태그</h3><div className="tag-cloud"><span>#성수마켓</span><span>#생활도자</span><span>#독립출판</span><span>#부산야시장</span><span>#셀러모집</span><span>#플리마켓준비</span></div></div>
          </aside>
        </div>
      </section>
    </div>
  );
}
