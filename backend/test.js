// vulnerable.js

const http = require("http");
const url = require("url");

// ❌ LỖ HỔNG: dùng eval() với dữ liệu từ người dùng
http.createServer((req, res) => {
  const query = url.parse(req.url, true).query;

  if (query.calc) {
    try {
      // Ví dụ: /?calc=2+2
      const result = eval(query.calc); // 🔥 LỖ HỔNG ở đây!
      res.end("Kết quả: " + result);
    } catch (err) {
      res.end("Lỗi tính toán");
    }
  } else {
    res.end("Dùng cú pháp: /?calc=2+2");
  }
}).listen(3000, () => {
  console.log("Server chạy tại http://localhost:3000");
});
