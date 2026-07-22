# Cloudflare Pages 배포 입력값

- Framework preset: React (Vite)
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/`
- Node.js version: 20 이상 권장

## 업로드 순서

1. 압축을 해제합니다.
2. 폴더 안의 파일 전체를 GitHub 저장소 최상단에 올립니다.
3. Cloudflare Pages에서 GitHub 저장소를 연결합니다.
4. 위 빌드 설정을 입력하고 배포합니다.
5. 배포 후 `/markets`, `/calendar`, `/community` 주소를 직접 열어 새로고침이 정상인지 확인합니다.

`public/_redirects`가 SPA 경로를 처리합니다.
