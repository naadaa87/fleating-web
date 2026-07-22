import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import AboutPage from './pages/AboutPage';
import CalendarPage from './pages/CalendarPage';
import CommunityPage from './pages/CommunityPage';
import EventsPage from './pages/EventsPage';
import HomePage from './pages/HomePage';
import MarketDetailPage from './pages/MarketDetailPage';
import MarketsPage from './pages/MarketsPage';
import MyPage from './pages/MyPage';
import NotFoundPage from './pages/NotFoundPage';
import RecruitPage from './pages/RecruitPage';
import SellerDetailPage from './pages/SellerDetailPage';
import SellersPage from './pages/SellersPage';
import SubmitMarketPage from './pages/SubmitMarketPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/markets" element={<MarketsPage />} />
          <Route path="/markets/:id" element={<MarketDetailPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/recruit" element={<RecruitPage />} />
          <Route path="/sellers" element={<SellersPage />} />
          <Route path="/sellers/:id" element={<SellerDetailPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/submit-market" element={<SubmitMarketPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
