# Arrange-DB
클래스룸 자료를 예제로 DB에 데이터 저장하고 연습하기

## [#1. MariaDB 초기세팅](https://github.com/dev-honing/Arrange-DB/issues/1)
### npm 초기화
```
npm init -y
```

### MariaDB 패키지 설치
```
npm install mysql2
```

### .gitignore 세팅
node_modules/ 추가

## [#2. 서버 제작과 index.html 서빙](https://github.com/dev-honing/Arrange-DB/issues/2)
### Express 패키지 설치
```
npm install express
```
### 서버 제작을 위한 기본 로직 작성
- app.js
### public/에 정적 파일 작성
- index.html
- index.css
### 정적 파일 서빙을 위한 로직 추가
- app.js

## [#3. DB 양식에 맞게 폼 처리](https://github.com/dev-honing/Arrange-DB/issues/3)
### HTML 파일에 폼 생성
- index.html
### 폼 제출을 위한 미들웨어 설정 및 POST 라우팅 로직 추가
- app.js
### 제출된 폼 데이터를 MariaDB에 저장
#### 설치된 MariaDB 패키지 가져오기
- app.js
#### MariaDB 연결 설정 및 데이터베이스, 테이블 생성 로직 추가
- app.js
#### 폼 데이터 저장 로직 추가
- app.js