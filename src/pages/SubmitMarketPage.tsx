import { CheckCircle2, ClipboardCheck, FileCheck2, Store, Users } from 'lucide-react';
import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface Submission { title: string; organizer: string; email: string; date: string; venue: string; recruiting: boolean; note: string; }

export default function SubmitMarketPage() {
  const [submissions, setSubmissions] = useLocalStorage<Submission[]>('fleeting:marketSubmissions', []);
  const [complete, setComplete] = useState(false);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const submission: Submission = {
      title: String(data.get('title') ?? ''), organizer: String(data.get('organizer') ?? ''), email: String(data.get('email') ?? ''), date: String(data.get('date') ?? ''), venue: String(data.get('venue') ?? ''), recruiting: data.get('recruiting') === 'on', note: String(data.get('note') ?? ''),
    };
    setSubmissions([...submissions, submission]);
    setComplete(true);
    event.currentTarget.reset();
  };

  return (
    <div className="page-wrap">
      <section className="page-hero submit-hero"><div className="container"><span className="eyebrow">MARKET REGISTRATION</span><h1>마켓 일정과 셀러 모집을<br />플리팅에 등록하세요.</h1><p>행사 정보를 한 번 등록하면 일정 노출, 셀러 모집, 참여 라인업과 공지 운영으로 이어지는 구조를 준비하고 있습니다.</p></div></section>
      <section className="section section-tight">
        <div className="container submit-layout">
          <div className="submit-benefits"><span className="eyebrow">ORGANIZER TOOLS</span><h2>주최자의 반복 업무를 줄입니다.</h2><div className="benefit-list"><div><Store /><div><strong>행사 페이지 자동 구성</strong><p>장소, 일정, 우천정책, 프로그램과 셀러 라인업을 한곳에 정리합니다.</p></div></div><div><Users /><div><strong>지원자 비교·선정</strong><p>카테고리, 참여이력과 대표상품을 기준으로 지원자를 검토합니다.</p></div></div><div><ClipboardCheck /><div><strong>공지와 체크인</strong><p>참여 확정 셀러에게 공지를 전달하고 현장 참여이력을 남깁니다.</p></div></div><div><FileCheck2 /><div><strong>다음 행사 복제</strong><p>지난 행사 설정과 우수 셀러를 불러와 다음 모집을 빠르게 시작합니다.</p></div></div></div></div>
          <div className="form-card">
            {complete && <div className="success-banner"><CheckCircle2 />등록 요청이 브라우저에 저장되었습니다. 실제 운영 시 관리자 검수와 이메일 알림으로 연결됩니다.</div>}
            <form className="stack-form" onSubmit={submit}>
              <label>행사명<input name="title" required placeholder="예: 성수 라이프스타일 마켓" /></label>
              <div className="form-row"><label>주최자·단체명<input name="organizer" required /></label><label>담당자 이메일<input name="email" type="email" required /></label></div>
              <div className="form-row"><label>개최일<input name="date" type="date" required /></label><label>장소<input name="venue" required placeholder="행사장 또는 주소" /></label></div>
              <label className="inline-checkbox"><input name="recruiting" type="checkbox" />셀러 모집도 함께 진행합니다.</label>
              <label>추가 내용<textarea name="note" rows={6} placeholder="운영시간, 카테고리, 참가비, 제공집기, 우천정책 등 확인이 필요한 내용을 적어주세요." /></label>
              <button className="button button-dark full-width">마켓 등록 요청 저장</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
