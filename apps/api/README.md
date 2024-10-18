<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```



## API 경로 형식

- 기본적으로는 복수형 명사를 사용

- `GET /resources` - 페이지 번호와 함께 리소스를 검색합니다.
- `GET /resources/:id` - ID로 단일 리소스를 검색합니다.
- `POST /resources` - 단일 또는 여러 리소스를 생성합니다.
- `PATCH /resources:id` - ID로 기존 리소스를 업데이트합니다.
- `PUT /resources:id` - ID로 기존 리소스를 업데이트하거나 생성합니다.



## **1. 사용자(User) API**

### 1.1. 인증 (Authentication)

- **POST** `/auth/register`: 이메일로 회원가입
- **POST** `/auth/login`: 이메일 로그인
- **POST** `/auth/oauth/kakao`: 카카오 로그인
- **POST** `/auth/oauth/naver`: 네이버 로그인
- **POST** `/auth/logout`: 로그아웃
- **GET** `/auth/me`: 현재 로그인한 사용자 정보 조회 (세션 기반)

------

### 1.2. 사용자 관리 (User)

- **GET** `/users`: 전체 사용자 목록 조회👨‍💻
- **GET** `/users/:id`: 특정 사용자 정보 조회(사용자 본인만)
- **PATCH** `/users/:id`: 사용자 정보 수정 (프로필 이미지 포함)
- **DELETE** `/users/:id`: 사용자 삭제

## **2. 서비스(Service) API**

### 2.1. 서비스 CRUD (Service Management)

- **GET** `/services`: 서비스 목록 조회 (필터링 및 페이지네이션)
- **POST** `/services`: 새로운 서비스 생성 (관리자)
- **GET** `/services/:id`: 특정 서비스 상세 조회
- **PATCH** `/services/:id`: 서비스 정보 수정 (관리자)
- **DELETE** `/services/:id`: 서비스 삭제 (관리자)

------

### 2.2. 서비스 휴무일 관리 (Holiday Management)

- **POST** `/services/:id/holidays`: 휴무일 추가 (관리자)
- **GET** `/services/:id/holidays`: 특정 서비스의 휴무일 목록 조회
- **DELETE** `/services/:id/holidays/:holidayId`: 특정 휴무일 삭제 (관리자)

------

## **3. 예약(Reservation) API**

### 3.1. 예약 생성 및 조회 (Reservation)

- **POST** `/reservations`: 새 예약 생성 (숙박형 / 회차형)
- **GET** `/reservations`: 사용자의 모든 예약 목록 조회 (로그인 필요)
- **GET** `/reservations/:id`: 특정 예약 상세 조회
- **PATCH** `/reservations/:id`: 예약 정보 수정 (관리자)
- **DELETE** `/reservations/:id`: 예약 취소 (사용자: 시작 전 취소 가능)

### 3.2. 결제 연동 (Payment with Stripe)

- **POST** `/payments/checkout`: Stripe 결제 세션 생성
- **POST** `/payments/webhook`: Stripe 결제 Webhook 처리 (예약 상태 갱신)

------

## **4. 게시판(Board) API**

### 4.1. 게시판  관리 (Board)

- **POST** `/boards`: 새 게시판 생성 (관리자)
- **GET** `/boards`: 전체 게시판 목록 조회
- **GET** `/boards/:id`: 특정 게시판 조회
- **PATCH** `/boards/:id`: 게시판 수정 (관리자)
- **DELETE** `/boards/:id`: 게시판 삭제 (관리자)

### 4.2. 게시글 관리 (Article)

- **POST** `/articles`: 새 게시글 등록 (관리자)
- **GET** `/articles`: 게시글 목록 조회 (필터링 / 페이지네이션)
- **GET** `/articles/:id`: 특정 게시글 상세 조회
- **PATCH** `/articles/:id`: 게시글 수정 (관리자)
- **DELETE** `/articlesd/:id`: 게시글 삭제 (관리자)

------

## **5. 리뷰(Review) API**

- **POST** `/reservations/:id/review`: 리뷰 작성 (예약 완료 후 가능)
- **GET** `/reviews`: 전체 리뷰 목록 조회 (필터링)
- **GET** `/reviews/:id`: 특정 리뷰 상세 조회
- **PATCH** `/reviews/:id`: 리뷰 수정 (사용자)
- **DELETE** `/reviews/:id`: 리뷰 삭제 (사용자)

------

## **6. 관리자(Admin) API**

- **GET** `/admin/dashboard`: 대시보드 데이터 조회 (예약 수, 매출 등)
- **GET** `/admin/reservations`: 전체 예약 목록 조회
- **PATCH** `/admin/reservations/:id/visibility`: 예약 노출 여부 설정
- **PATCH** `/admin/services/:id/visibility`: 서비스 노출 여부 설정



db - https://console.neon.tech/app/projects
cookies - https://docs.nestjs.com/techniques/cookies#use-with-fastify
https://github.com/fastify/fastify-cookie
https://www.npmjs.com/package/@fastify/secure-session
