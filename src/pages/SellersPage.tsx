import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { sellers } from '../data';
import { SellerCard } from '../components/Cards';

export default function SellersPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('전체');
  const categories = ['전체', ...Array.from(new Set(sellers.map((seller) => seller.category)))];
  const filtered = useMemo(() => sellers.filter((seller) => {
    const needle = query.toLowerCase();
    return (!needle || `${seller.name} ${seller.handle} ${seller.intro} ${seller.specialties.join(' ')}`.toLowerCase().includes(needle)) && (category === '전체' || seller.category === category);
  }), [query, category]);

  return (
    <div className="page-wrap">
      <section className="page-hero simple-page-hero seller-directory-hero">
        <div className="container">
          <span className="eyebrow">SELLER DIRECTORY</span>
          <h1>좋아하는 셀러를 발견하고<br />다음 출점까지 이어보세요.</h1>
          <p>참여이력과 대표상품, SNS·유튜브·틱톡·스레드·온라인몰을 하나의 프로필에서 확인합니다.</p>
          <div className="page-search-box"><Search size={20} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="셀러명, 상품, 카테고리 검색" /></div>
        </div>
      </section>
      <section className="section section-tight">
        <div className="container">
          <div className="chip-row">{categories.map((item) => <button key={item} className={item === category ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div>
          <div className="results-heading"><div><strong>{filtered.length}</strong>개의 셀러 프로필</div><select><option>추천 순</option><option>참여이력 순</option><option>팔로워 순</option></select></div>
          <div className="seller-grid seller-directory-grid">{filtered.map((seller) => <SellerCard key={seller.id} seller={seller} />)}</div>
        </div>
      </section>
    </div>
  );
}
