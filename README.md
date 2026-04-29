# Gapp

경상국립대학교 재학생을 위한 공식 앱입니다.
비로그인 상태에서는 학교 공지 및 행사를 확인할 수 있으며, 로그인 시 학과 공지·행사·식단표·학사일정·개인 일정·마이페이지 기능을 이용할 수 있습니다.

---

## 팀 구성

| 역할 | 이름 |
|------|------|
| 기획자 | 최준혁 |
| PM | 이승주 |
| 리드 개발자 | 김태우 |
| 개발자 | 김동현 |

---

## 기술 스택

> 추후 작성

---

## 브랜치 전략

| 브랜치 | 역할 | 직접 Push |
|--------|------|-----------|
| `main` | 배포 브랜치 | 금지 |
| `develop` | 통합 브랜치 | 금지 |
| `feature/#-설명` | 기능 개발 | 가능 |
| `fix/#-설명` | 버그 수정 | 가능 |
| `hotfix/#-설명` | 긴급 수정 | PM 승인 후 |

브랜치 흐름:
```
feature/* 또는 fix/*  →  develop  →  (배포 준비 완료 시)  →  main
```

---

## 커밋 메시지 컨벤션

```
<type>: <내용> (#이슈번호)

Closes #이슈번호
```

| type | 의미 |
|------|------|
| `feat` | 새 기능 추가 |
| `fix` | 버그 수정 |
| `ui` | 디자인/레이아웃 수정 |
| `refactor` | 리팩토링 |
| `docs` | 문서, 주석 |
| `chore` | 설정, 패키지 관리 |

작성 예시:
```
feat: 로그인 기능 구현 (#4)

- 이메일/비밀번호 로그인 구현
- 로그인 상태 유지 처리

Closes #4
```

---

## 개발 시작 전 필수 절차

작업 시작 전 항상 develop 최신 상태를 유지해야 합니다.

```bash
git checkout develop
git pull origin develop
git checkout -b feature/#-설명
```

---

## Push & Pull Request 절차

**1. 작업 완료 후 push**
```bash
git add .
git commit -m "feat: 기능 설명 (#이슈번호)"
git push origin feature/#-설명
```

**2. GitHub에서 PR 생성**
- base: `develop` ← compare: `feature/#-설명`
- PR 템플릿에 맞게 작성
- 관련 이슈 번호 `Closes #` 작성

**3. 리뷰 및 머지**
- `feature → develop` PR: 리드 개발자 Approve 후 머지
- `develop → main` PR: PM 최종 Approve 후 머지

---

## 다른 개발자 변경사항 가져오기

PR이 develop에 머지된 후, 다른 개발자는 아래 명령어로 최신 코드를 로컬에 반영합니다.

```bash
git checkout develop
git pull origin develop
```

새로운 패키지가 추가된 경우 아래 명령어도 함께 실행합니다.

```bash
npm install
```

---

## 이슈 관리

- 기능 단위로 이슈를 생성하고 작업을 시작합니다.
- 브랜치 이름은 `feature/#이슈번호-설명` 형식으로 생성합니다.
- PR 머지 시 관련 이슈가 자동으로 close됩니다.

---

## 문의

PM(이승주) — GitHub Issues 또는 직접 문의