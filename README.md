# 숙소예약 서비스 8팀 

## 팀원

| 클래스      | 이름                      |
| --------- | -------------------------- |
| Back-end  | [Ever](https://github.com/hsik0225)               |
| Front-end | [Hoo](https://github.com/choisohyun), [Joy](https://github.com/hyewon3938) |

## 요구사항 기술서

- [요구사항 기술서 링크](https://docs.google.com/spreadsheets/d/1ZvHwfX8RYKbBCyquydUOH0CLA9b0b9SV0C92Q4cI3_M/edit?usp=sharing)

## Ground Rule

### 컨벤션

- [Git - 커밋 메시지 컨벤션](https://doublesprogramming.tistory.com/256)을 따른다. 
- 커밋에 이슈 번호를 붙인다. 
  `[이슈 번호] 커밋 타입: 커밋 제목`
  `[#3] feat: 안녕하세요.`
- 커밋 타입은 `[#3] feat:` 형식을 유지한다.

          
### 프로젝트 관리

- 각 클래스별 저장소 폴더를 만들어서 관리한다.
- FE - Milestone으로 주마다 해야 할 일을 나눠 관리한다.
- BE - 이슈 등록하여 관리한다. 

### 브랜치 관리

- `master`: 최종 릴리즈되는 마스터
- `dev`: 각 클래스 별 기능 완료 시 PR보내는 브랜치, default 브랜치로 설정
- `feature_{class}/{feature}`: 기능 단위로 브랜치 클래스 분류해서 설정

> 기능 단위 브랜치는 `dev`로 머지 후에 삭제한다.
- `master`, `dev` 는 배포를 위해서 동작하는 상태의 산출물이 있다.



### 이슈 관리

`[클래스명] 이슈 제목`
- issue에 구현할 내용 정리한다.
- 구현 후 commit할 때 closed 처리한다.
- `Auto Close`를 사용할 필요가 있는 경우 PR이나 Commit Message에 `Close Keyword`를 적어서 Issue Close가 가능합니다.


### Pull Request 관리

`[클래스명] PR 제목`
- 이슈 번호 사용은 자유롭게 한다.

### 스크럼

- 시간: 11시 30분
- 방식: 구두로 공유 후 wiki에 해당 날짜의 스크럼 업로드 (Ever -> Joy -> Hoo 순서로 기록), 빠지는 날이 있으면 슬랙 or 행아웃으로 진행
- 공유하는 내용: 어제 한 일, 오늘 할 일, 오늘 컨디션


### 회고

- 시간: 매주 금요일 5시 
- 방식: 구두로 공유 후 시트에 적기
- 공유하는 내용: 스크럼에서 계획했던 할 일을 얼마나 했는지 정도
