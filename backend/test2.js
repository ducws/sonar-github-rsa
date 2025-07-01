// file: vulnerable_command.js

const http = require("http");
const url = require("url");
const { exec } = require("child_process");

http.createServer((req, res) => {
  const query = url.parse(req.url, true).query;

  if (query.name) {
    // ❌ LỖ HỔNG: chèn trực tiếp dữ liệu người dùng vào shell command
    exec(`ping -c 1 ${query.name}`, (err, stdout, stderr) => {
      if (err) {
        res.end("Lỗi khi ping.");
        return;
      }
      res.end(`Kết quả:\n${stdout}`);
    });
  } else {
    res.end("Dùng cú pháp: /?name=example.com");
  }
}).listen(3000, () => {
  console.log("Server đang chạy tại http://localhost:3000");
});
