import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return <div className="not-found"><img src="/assets/logo-main-transparent.png" alt="플리팅" /><h1>페이지를 찾을 수 없습니다.</h1><p>주소가 변경되었거나 아직 준비중인 페이지입니다.</p><Link to="/" className="button button-dark"><ArrowLeft size={17} />홈으로 돌아가기</Link></div>;
}
