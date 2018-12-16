# firebase-starter

인프런 Firebase 강의 정리

## 웹서비스에 대한 이해

- Web Sever [static] : HTML/CSS/Javascript (Source Files)
- Back-end Server Application (Tomcat) : Java/node.js (Source Files)
- Database Server Application (Oracle, MySQL)

Front end <-- (ajax/axios 통신) --> Back end <-- (DB사에서 제공하는 Lbray) --> DB

Front end <-- (Parse에서 제공하는 Javascript Library) --> Cloud Server

## AWS / IDC / Cloud (Firebase) 비교 이해

IDC(Internet Data Center)

Storage Machine, Application Machine(Web Server) - Tomcat, Database Machine+Server - MySQL

수동으로 모든걸 했어야함

AWS (Amazon Web Service)

원하는 걸 조합해서 사용할 수 있음 (플러그인 방식)

Cloud (Firebase)

모든 관리를 구글이 다함, 사용자는 배포만 하면 됨.

## 커스텀 도메인

https://templated.co/

https://domain.whois.co.kr/regist/dom.php

위 사이즈에서 도메인 제공 받고 연결

## auth

authentication에서 승인된 도메인 체크, 오른쪽 상단의 웹설정가면 auth 설정에 필요한 것이 되어있음.

https://firebase.google.com/docs/web/setup?authuser=0

https://www.creative-tim.com

### auth 비밀번호 계정

https://firebase.google.com/docs/auth/web/password-auth?authuser=0

### auth facebook 로그인 

https://firebase.google.com/docs/auth/web/facebook-login?authuser=0

### auth 구글 로그인

https://firebase.google.com/docs/auth/web/google-signin?authuser=0

## Firebase DB 이해


관계형 데이터베이스 (MySQL, ORACLE)

1. 물리적 Table Data 정의
2. Table(Binary)기반 Data 조작
3. Table(Binary)기반 Data 제어
4. SQL 사용

비관계형 데이터베이스 (Firebase Realtime Database)

1. Json Tree node 정의
2. Json(Text)기반 Data 조작
3. Json(Text)기반 Data 제어
4. NoSQL 사용

## Firebase DB 규칙

https://firebase.google.com/docs/database/security/?authuser=0

## Firebase DB 쿼리

https://firebase.google.com/docs/database/web/lists-of-data?authuser=0

## Firebase DB 업데이트, 삭제

https://firebase.google.com/docs/database/web/read-and-write?authuser=0#updating_or_deleting_data

### Firebase DB를 잘 사용하는 방법

1. Node key에 “/” 가 들어가선 안됨
2. Set과 Update는 분리해서 사용할 것
3. Query는 비동기로 작동함
4. Listening 은 필요할 때만 . 필요하지 않을 때는 once로 (불필요한 리소스)
5. Root node는 최대한 목적에 맞게 그룹화
6. Data는 최대한 분산
7. Index 활용 최대화
8. Image는 Base64보다는 Storage URL로