# 플리팅 FLEETING 웹사이트

플리마켓 일정, 셀러 모집, 참여 셀러, 피드와 이벤트를 연결하는 **플리팅 프론트엔드 MVP**입니다.

## 현재 구현된 페이지

- 홈: 검색, 다가오는 마켓, 모집공고, 추천 셀러, 피드, 이벤트
- 마켓 찾기: 지역·카테고리·모집 여부 필터
- 마켓 상세: 기본정보, 모집 안내, 지원서, 참여 셀러, 프로그램, 댓글
- 일정 캘린더: 월별 마켓 일정
- 셀러 모집: 모집공고와 지원 프로세스
- 셀러 디렉토리·상세: 브랜드 소개, 참여이력, SNS·온라인몰 링크
- 셀러 피드: 게시물 작성 시연 및 활동 피드
- 이벤트: 스탬프·쿠폰·맞춤 알림 기능 예시
- 마켓 등록: 주최자 등록 요청 폼
- 마이 플리팅: 관심등록, 좋아요, 지원서 현황
- 플리팅 소개: 시장 문제, 해결방식, 운영원칙, 확장 로드맵

## 시연 기능

현재 버전은 별도 서버 없이 동작하는 프론트엔드 MVP입니다. 아래 정보는 브라우저 `localStorage`에 저장됩니다.

- 관심등록·좋아요
- 댓글
- 셀러 지원서
- 피드 게시물
- 마켓 등록 요청

브라우저를 바꾸거나 저장공간을 초기화하면 시연 데이터가 사라집니다.

## 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 Vite가 안내하는 로컬 주소를 엽니다.

## 프로덕션 빌드

```bash
npm run build
npm run preview
```

빌드 결과는 `dist` 폴더에 생성됩니다.

## GitHub → Cloudflare Pages 배포

1. 이 폴더 안의 파일을 GitHub 저장소 최상단에 업로드합니다.
2. Cloudflare 대시보드에서 **Workers & Pages → Create → Pages → Connect to Git**를 선택합니다.
3. GitHub 저장소를 연결합니다.
4. 빌드 설정을 아래와 같이 입력합니다.

| 항목 | 입력값 |
|---|---|
| Framework preset | Vite 또는 React (Vite) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` |

`public/_redirects` 파일이 포함되어 있어 React 내부 경로를 새로고침해도 `index.html`로 연결됩니다.

## 주요 폴더

```text
src/
  components/   공통 레이아웃, 카드, 캘린더
  pages/        페이지별 화면
  hooks/        localStorage 상태 훅
  lib/          날짜 포맷 유틸리티
  data.ts       시연용 마켓·셀러·피드 데이터
  types.ts      데이터 타입
public/
  assets/       로고와 브랜드 이미지
  _redirects    Cloudflare Pages SPA 경로 처리
```

## 실제 서비스 전환 시 권장 순서

1. **인증·권한**: 방문객, 셀러, 주최자, 관리자 역할 분리
2. **데이터베이스**: 마켓, 모집공고, 지원서, 셀러 프로필, 피드, 댓글 구조 이전
3. **관리자 검수**: 중복행사, 공식출처, 신고, 수정이력
4. **알림**: 모집 마감, 선정 결과, 일정 변경, 팔로우 셀러 출점
5. **결제**: 참가비 결제, 취소·환불, 정산, 영수증
6. **앱**: 동일 API를 이용하는 Android/iOS 앱과 푸시알림

세부 구조는 `docs/ARCHITECTURE.md`를 참고하세요.

## 검증 메모

이 배포 패키지는 React + Vite 소스 기준으로 구성되어 있습니다. 로컬 환경의 외부 패키지 다운로드가 제한되어 이 세션에서는 최종 빌드 실행까지 완료하지 못했습니다. GitHub/Cloudflare Pages 연결 시 npm install 후 npm run build가 실행됩니다.
