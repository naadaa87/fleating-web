import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { categories, markets, regions } from '../data';
import { MarketCard } from '../components/Cards';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function MarketsPage() {
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') ?? '');
  const [region, setRegion] = useState('전체');
  const [category, setCategory] = useState('전체');
  const [recruitingOnly, setRecruitingOnly] = useState(false);
  const [saved, setSaved] = useLocalStorage<string[]>('fleeting:savedMarkets', []);
  const [liked, setLiked] = useLocalStorage<string[]>('fleeting:likedMarkets', []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return markets.filter((market) => {
      const searchable = [market.title, market.summary, market.city, market.district, market.venue, ...market.category, ...market.tags].join(' ').toLowerCase();
      return (!needle || searchable.includes(needle)) &&
        (region === '전체' || market.city === region) &&
        (category === '전체' || market.category.includes(category)) &&
        (!recruitingOnly || market.status === 'recruiting');
    });
  }, [query, region, category, recruitingOnly]);

  const toggle = (list: string[], id: string, setter: (value: string[]) => void) => setter(list.includes(id) ? list.filter((item) => item !== id) : [...list, id]);

  return (
    <div className="page-wrap">
      <section className="page-hero simple-page-hero">
        <div className="container">
          <span className="eyebrow">MARKET DISCOVERY</span>
          <h1>취향과 일정에 맞는<br />플리마켓을 찾아보세요.</h1>
          <p>지역, 날짜, 카테고리와 모집 여부를 기준으로 필요한 마켓만 빠르게 확인할 수 있습니다.</p>
          <div className="page-search-box">
            <Search size={20} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="마켓명, 장소, 카테고리 검색" />
          </div>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container">
          <div className="filter-panel">
            <div className="filter-group">
              <span>지역</span>
              <div>{regions.map((item) => <button key={item} className={region === item ? 'active' : ''} onClick={() => setRegion(item)}>{item}</button>)}</div>
            </div>
            <div className="filter-group">
              <span>카테고리</span>
              <div>{categories.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div>
            </div>
            <label className="filter-check"><input type="checkbox" checked={recruitingOnly} onChange={(event) => setRecruitingOnly(event.target.checked)} /><SlidersHorizontal size={16} /> 셀러 모집중만 보기</label>
          </div>

          <div className="results-heading">
            <div><strong>{filtered.length}</strong>개의 마켓을 찾았습니다.</div>
            <select aria-label="정렬"><option>다가오는 순</option><option>관심 많은 순</option><option>최근 등록 순</option></select>
          </div>

          {filtered.length > 0 ? (
            <div className="market-grid">
              {filtered.map((market) => (
                <MarketCard key={market.id} market={market} saved={saved.includes(market.id)} liked={liked.includes(market.id)} onSave={() => toggle(saved, market.id, setSaved)} onLike={() => toggle(liked, market.id, setLiked)} />
              ))}
            </div>
          ) : (
            <div className="empty-state"><Search size={34} /><h3>조건에 맞는 마켓이 없습니다.</h3><p>지역이나 카테고리를 조금 넓혀 다시 찾아보세요.</p></div>
          )}
        </div>
      </section>
    </div>
  );
}
