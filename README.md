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
| 개발자 | 임재승 |
| 네트워킹 | 성민수 |

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

**브랜치 흐름:**
```
feature/* 또는 fix/*  →  develop  →  (배포 준비 완료 시)  →  main
```

---

## 커밋 메시지 양식

| type | 의미 |
|------|------|
| `feat` | 새 기능 추가 |
| `fix` | 버그 수정 |
| `ui` | 디자인/레이아웃 수정 |
| `refactor` | 리팩토링 |
| `docs` | 문서, 주석 |
| `chore` | 설정, 패키지 관리 |

**커밋 메시지 작성 예시:**
```
feat: 로그인 기능 구현 (#4)
```

**커밋 명령어 작성 예시:**
```bash
git commit -m "feat: 로그인 기능 구현 (#4)"
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

> commit은 나의 "변동 사항"을 임시 저장소에 임시로 저장해놓은 것이다.
>
> push는 GitHub에 나의 변동 사항들이 "임시로 저장된 commit"을 한번에 올리는 것이다.
>
> **중요:** push는 여러 commit을 한번에 GitHub에 올릴 수 있기 때문에 "여러 commit을 모아서, 한번에 push하고, 한번 PR 요청을 한다."
>
> (물론 기능 별로 구현을 한다고 할 때에는 여러 push가 맞지만, 하나의 기능을 구현할 때 수정사항이 생길 때마다 push를 해서 PR 요청하는 것은 비효율적이다.)

**2. GitHub에서 PR 생성**
- base: `develop` ← compare: `feature/#-설명`
- PR 템플릿에 맞게 작성
- 관련 이슈 번호 `Closes #` 작성

**3. 리뷰 및 머지**
- `feature → develop` PR: 모든 인원 머지 가능
- `develop → main` PR: 모든 인원 머지 가능
- Approvals 제한은 별도 설정하지 않으나, **PM이 구두로 지정한 인원이 아닌 이상 머지 버튼 및 PR 승인을 하지 않는다.**

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