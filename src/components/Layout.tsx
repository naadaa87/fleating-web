import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Bell, Bookmark, CalendarDays, Menu, Search, UserRound, X } from 'lucide-react';

const links = [
  { to: '/markets', label: '마켓 찾기' },
  { to: '/calendar', label: '캘린더' },
  { to: '/recruit', label: '셀러 모집' },
  { to: '/sellers', label: '셀러' },
  { to: '/community', label: '피드' },
  { to: '/events', label: '이벤트' },
];

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="brand-link" aria-label="플리팅 홈">
            <img src="/assets/logo-horizontal-transparent.png" alt="플리팅 FLEETING" className="header-logo" />
          </Link>

          <nav className="desktop-nav" aria-label="주요 메뉴">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? 'active' : '')}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-actions">
            <Link to="/markets" className="icon-button" aria-label="검색">
              <Search size={19} />
            </Link>
            <Link to="/mypage" className="icon-button" aria-label="관심 마켓">
              <Bookmark size={19} />
            </Link>
            <button className="icon-button" aria-label="알림">
              <Bell size={19} />
            </button>
            <Link to="/mypage" className="button button-dark button-small">
              <UserRound size={16} />
              마이 플리팅
            </Link>
            <button className="mobile-menu-button" aria-label="메뉴 열기" onClick={() => setMobileOpen(true)}>
              <Menu size={23} />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="mobile-drawer-backdrop" role="presentation" onClick={() => setMobileOpen(false)}>
          <div className="mobile-drawer" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <div className="mobile-drawer-top">
              <img src="/assets/logo-horizontal-transparent.png" alt="플리팅" />
              <button className="icon-button" onClick={() => setMobileOpen(false)} aria-label="메뉴 닫기">
                <X size={22} />
              </button>
            </div>
            <nav className="mobile-nav">
              {links.map((link) => (
                <NavLink key={link.to} to={link.to}>
                  {link.label}
                </NavLink>
              ))}
              <NavLink to="/submit-market">마켓 등록</NavLink>
              <NavLink to="/about">플리팅 소개</NavLink>
              <NavLink to="/mypage">마이 플리팅</NavLink>
            </nav>
          </div>
        </div>
      )}

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <img src="/assets/logo-horizontal-transparent.png" alt="플리팅" className="footer-logo" />
            <p className="footer-copy">플리마켓의 일정과 셀러, 방문객의 관심을 한곳에서 연결합니다.</p>
            <p className="demo-note">현재 등록된 일정과 셀러 정보는 서비스 화면 구성을 보여주기 위한 예시 데이터입니다.</p>
          </div>
          <div>
            <strong>서비스</strong>
            <Link to="/markets">마켓 찾기</Link>
            <Link to="/calendar">일정 캘린더</Link>
            <Link to="/recruit">셀러 모집</Link>
            <Link to="/community">셀러 피드</Link>
          </div>
          <div>
            <strong>운영 안내</strong>
            <Link to="/submit-market">마켓 등록</Link>
            <Link to="/about">서비스 소개</Link>
            <a href="mailto:partner@fleeting.kr">제휴 문의</a>
            <a href="mailto:help@fleeting.kr">고객센터</a>
          </div>
          <div>
            <strong>다가오는 기능</strong>
            <span>회원가입·인증</span>
            <span>안전결제·정산</span>
            <span>안드로이드·iOS 앱</span>
            <span>주최자 운영 대시보드</span>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 FLEETING. All rights reserved.</span>
          <div>
            <a href="#">이용약관</a>
            <a href="#">개인정보처리방침</a>
            <a href="#">운영정책</a>
          </div>
        </div>
      </footer>

      <div className="mobile-bottom-nav" aria-label="모바일 바로가기">
        <NavLink to="/markets"><Search size={19} /><span>찾기</span></NavLink>
        <NavLink to="/calendar"><CalendarDays size={19} /><span>캘린더</span></NavLink>
        <NavLink to="/recruit"><Bookmark size={19} /><span>모집</span></NavLink>
        <NavLink to="/community"><Menu size={19} /><span>피드</span></NavLink>
        <NavLink to="/mypage"><UserRound size={19} /><span>마이</span></NavLink>
      </div>
    </div>
  );
}
