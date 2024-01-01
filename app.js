const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mysql = require("mysql2"); // mysql2 패키지 추가

const app = express();
const port = 3000;

// MariaDB 연결 설정
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
});

// 데이터베이스 생성
db.query("CREATE DATABASE IF NOT EXISTS classroomDB", (err) => {
  if (err) {
    throw err;
  }

  // classroomDB 선택
  db.query("USE classroomDB", (err) => {
    if (err) {
      throw err;
    }
    console.log("classroomDB 선택 완료");
  });

  // 테이블 생성
  db.query(
    `
    CREATE TABLE IF NOT EXISTS classroom (
      id INT AUTO_INCREMENT PRIMARY KEY,
      tag VARCHAR(255),
      subject VARCHAR(255),
      number INT,
      title VARCHAR(255)
    )
  `,
    (err) => {
      if (err) {
        throw err;
      }
      console.log("classroom 테이블 생성 완료");
    }
  );
});

// 연결 확인
db.connect((err) => {
  if (err) {
    console.error("MariaDB 연결 실패: ", err);
  } else {
    console.log("MariaDB 연결 성공");
  }
});

// body-parser 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 정적 파일 제공을 위한 미들웨어 설정
app.use(express.static(path.join(__dirname, "public")));

// 기본 라우팅
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 제출 버튼 눌렀을 때의 POST 라우팅
app.post("/submit", (req, res) => {
  const tag = req.body.tag;
  const subject = req.body.subject;
  const number = req.body.number;
  const title = req.body.title;

  // 연번 중복 체크
  const checkDuplicateQuery =
    "SELECT id FROM classroom WHERE number = ?";
  db.query(checkDuplicateQuery, [number], (checkErr, checkResults) => {
    if (checkErr) {
      console.error("중복 체크 중 오류 발생: ", checkErr);
      res.send("중복 체크 중 오류가 발생했습니다.");
      return;
    }

    if (checkResults.length > 0) {
      console.log(`연번 중복: ${number}번은 이미 등록되어 있음`);
      res.send("해당 연번은 이미 등록되어 있습니다.");
    } else {
      // 데이터베이스에 저장
      const insertQuery =
        "INSERT INTO classroom (tag, subject, number, title) VALUES (?, ?, ?, ?)";
      db.query(insertQuery, [tag, subject, number, title], (err, results) => {
        if (err) {
          console.error("데이터베이스에 저장 실패: ", err);
          res.send("데이터베이스에 저장하는 중 오류가 발생했습니다.");
        } else {
          console.log("데이터베이스에 저장 완료");
          res.send("제출이 완료되었습니다.");
        }
      });
    }
  });
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버 ON: http://localhost:${port}`);
});
