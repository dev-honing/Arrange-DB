const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // body-parser 미들웨어 추가

const app = express();
const port = 3000;

// body-parser 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 정적 파일 제공을 위한 미들웨어 설정
app.use(express.static(path.join(__dirname, 'public')));

// 기본 라우팅
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 제출 버튼 눌렀을 때의 POST 라우팅
app.post('/submit', (req, res) => {
  const tag = req.body.tag;
  const subject = req.body.subject;
  const number = req.body.number;
  const title = req.body.title;

  // 서버 콘솔에 출력
  console.log(`제출된 내용: [${tag}] ${subject}-${number} | ${title}`);

  // 응답 전송
  res.send('제출이 완료되었습니다.');
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버 ON: http://localhost:${port}`);
});
