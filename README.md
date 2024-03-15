# ably-api-server

## 사용 기술

- typescript
- node js (express)
- mongodb (mongoose)
- jest
- docker

## 개발 환경

- visual studio code

## 실행 방법

### 1. Docker 설치

도커가 없다면 [Docker Desktop](https://www.docker.com/products/docker-desktop)을 설치해주세요.

> ❗ 실행 편의성을 위해 makefile을 구성했어요. 아래 순서대로 실행해주세요.

0. npm install

1. make run // (run app, mongo container)

2. make migration // (import dummy_product.csv to mongo), 1번에서 app이 기동된걸 확인 후 터미널을 하나 더 열어서 실행해주세요.

만약 make 명령어를 사용할 수 없는 경우, 아래 명령어를 순서대로 실행해주세요.

```bash
# 1. app, db 실행 (꼭 console에서 실행 완료 로그를 확인한 뒤 2번을 실행해주세요.)
docker-compose up

# 2. migration (import dummy_product.csv)
tsx src/migration/import-product.ts
```

1번 명령을 통해 app이 실행되고, db에 연결이 맺어져야해요. (혹시 실행에 문제가 있는 경우 메일 부탁드리겠습니다. 빠르게 회신해볼께요.)

이제 아래 API 명세에 작성해놓은 예제 cURL 명령 실행또는 익숙하신 http client (e.g. postman)를 통해 테스트를 진행할 수 있어요.

## API 명세

### 회원 가입

- **URL:** `/users/commands/sign-up`
- **Method:** POST
- **cURL:**

```
curl --location 'http://127.0.0.1:3000/uesrs/commands/sign-up' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "eddy@healingpaper.com",
    "password" :"as123456"
}'
```

- 이메일과 패스워드로 회원가입을 한다.
- 이미 있는 이메일로 요청하면 400 예외를 반환한다.

### 로그인

- **URL:** `/users/commands/sign-in`
- **Method:** POST
- **cURL:**

```curl
curl --location 'http://127.0.0.1:3000/uesrs/commands/sign-in' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "eddy@healingpaper.com",
    "password" :"as123456"
}'
```

- 로그인을 할 수 있다.
- 응답으로는 로그인한 유저 정보와 인증 토큰을 반환한다.
- 패스워드가 틀릴 경우 400 예외를 반환한다.

### 찜 서랍 생성

- **URL:** `/wish-lists/commands/create-wish-list`
- **Method:** POST
- **cURL:**

```curl
curl --location 'http://localhost:3000/wish-lists/commands/create-wish-list' \
--header 'Authorization: Bearer ${로그인하고 발급받은 토큰 값}' \
--header 'Content-Type: application/json' \
--data '{
    "name": "신발 서랍"
}'
```

- 찜 서랍을 생성할 수 있다.
- 이미 있는 내 찜 서랍의 이름으로 생성하면 400 예외를 반환한다.
- 요청 헤더에는 반드시 로그인에서 발급받은 토큰 값을 Bearer 형식으로 입력한다.

### 찜 서랍 삭제

- **URL:** `/wish-lists/commands/delete-wish-list`
- **Method:** POST
- **cURL:**

```curl
curl --location 'http://localhost:3000/wish-lists/commands/delete-wish-list' \
--header 'Authorization: Bearer ${로그인하고 발급받은 토큰 값}' \
--header 'Content-Type: application/json' \
--data '{
    "wishListId": ${삭제하려고 한 찜 서랍 ID}
}'
```

- 찜 서랍을 삭제할 수 있다.

### 찜 서랍 목록 조회

- **URL:** `/wish-lists/queries/get-wish-lists`
- **Method:** POST
- **cURL:**

```curl
// 첫 조회 시 size만 보낸다.
curl --location 'http://127.0.0.1:3000/wish-lists/queries/get-wish-lists' \
--header 'Authorization: Bearer ${로그인하고 발급받은 토큰 값}' \
--header 'Content-Type: application/json' \
--data '{
    "size": 10
}'

// 첫 조회 응답값으로 받은 nextCursor의 값을 요청 cursor에 주입하여 요청한다. (커서 기반 페이지네이션)
curl --location 'http://127.0.0.1:3000/wish-lists/queries/get-wish-lists' \
--header 'Authorization: Bearer ${로그인하고 발급받은 토큰 값}' \
--header 'Content-Type: application/json' \
--data '{
    "size": 10,
    "cursor": ${이전 조회 응답으로 받은 nextCursor 값}
}'
```

- 커서 기반 페이지네이션을 통해 찜 서랍 목록을 탐색할 수 있다.
- 첫 페이지 조회 시 size로만 조회한다. 그 후 응답으로 받은 다음 커서(nextCursor)의 값을 요청에 실어 다음 값을 요청한다.

### 찜 상품 목록 조회

- **URL:** `/wish-lists/queries/get-wish-list-products`
- **Method:** POST
- **cURL:**

```curl
// 첫 조회 시 size만 보낸다.
curl --location 'http://127.0.0.1:3000/wish-lists/queries/get-wish-list-products' \
--header 'Authorization: Bearer ${로그인하고 발급받은 토큰 값}' \
--header 'Content-Type: application/json' \
--data '{
    "wishListId": "65f3a76c305506d901f554aa",
    "size": 10
}'

// 첫 조회 응답값으로 받은 nextCursor의 값을 요청 cursor에 주입하여 요청한다. (커서 기반 페이지네이션)
curl --location 'http://127.0.0.1:3000/wish-lists/queries/get-wish-list-products' \
--header 'Authorization: Bearer ${로그인하고 발급받은 토큰 값}' \
--header 'Content-Type: application/json' \
--data '{
    "wishListId": "65f3a76c305506d901f554aa",
    "size": 10,
    "cursor": ${이전 조회 응답으로 받은 nextCursor 값}
}'
```

- 커서 기반 페이지네이션을 통해 찜 상품 목록을 탐색할 수 있다.

### 찜 상품 추가

- **URL:** `/wish-lists/commands/add-wish-list-product`
- **Method:** POST
- **cURL:**

```curl
curl --location 'http://127.0.0.1:3000/wish-lists/commands/add-wish-list-product' \
--header 'Authorization: Bearer ${로그인하고 발급받은 토큰 값}' \
--header 'Content-Type: application/json' \
--data '{
    "wishListId": ${찜 서랍 ID},
    "productId" : ${추가하고자 한 상품 ID}
}'
```

- 찜 상품을 추가한다.
- 나의 이미 다른 찜 서랍에 상품이 존재하면 400 예외를 반환한다.
- 하나의 찜 서랍에 동일한 찜 상품을 추가하면 400 예외를 반환한다.
- (요청의 productId는 상품 목록 조회 응답으로 받은 id 값으로 설정한다.)

### 찜 상품 제거

- **URL:** `/wish-lists/commands/remove-wish-list-product`
- **Method:** POST
- **cURL:**

```curl
curl --location 'http://127.0.0.1:3000/wish-lists/commands/remove-wish-list-product' \
--header 'Authorization: Bearer ${로그인하고 발급받은 토큰 값}' \
--header 'Content-Type: application/json' \
--data '{
    "wishListId": ${찜 서랍 ID},
    "productId" : ${추가되어있는 찜 상품 ID}
}'
```

- 찜 상품을 제거한다.

### 상품 목록 조회

- **URL:** `/products/queries/get-products`
- **Method:** POST
- **cURL:**

```curl
curl --location 'http://127.0.0.1:3000/products/queries/get-products' \
--header 'Content-Type: application/json' \
--data '{"query":"","variables":{}}'
```

- 상품 목록을 전체 조회한다.
  - (요구사항엔 없는 API이지만, 찜 상품을 추가할 때 상품 id를 가져오기 위해 구현하였음.)

## 프로젝트 설명

- clean architecture를 기반으로 패키지 구조를 설계했어요.

  - api
    - Application Context, 의존성 주입, Controller 등 외부에 대한 의존성을 갖는 모듈입니다.
  - Contracts
    - 통신 계약 모델이 작성되는 모듈입니다.
    - e.g. DTO(Data Transfer Object), VO(Value Object) 등
  - Domain-Model
    - 도메인 논리를 구현하는 UseCase와 Domain Entity, 외부 모듈로부터 의존성 방향을 역전하기 위한 Interface가 정의되어있습니다.
    - 따라서, 외부 모듈인 Data-Access, Infrastructure 구현체 모듈은 언제든지 다른 프레임워크, 라이브러리로 교체 될 수 있습니다.
    - UseCase는 하나의 책임만 가질 수 있도록 구성하였고, 명령과 조회의 책임을 분리할 수 있도록 command와 query 모델을 분리하여 작성하였습니다.
      - 응집된 테스팅을 위해 서비스 로직이 단일 책임 원칙을 가지도록 구성했습니다.
  - Data-Access

    - 데이터 접근에 대한 컨텍스트를 가진 모듈입니다. Data Access에 관련된 구현체들이 담겨져있습니다.
      - e.g. Repository 구현체, Data Model(Document), Domain Model의 Entity로 변환시키는 Data Mapper

  - unit-test
    - 테스트가 작성되는 모듈입니다.
