var jsonServer = require("json-server");
var server = jsonServer.create();
var router = jsonServer.router("db.json");
var middlewares = jsonServer.defaults();

server.use(middlewares);

// Thêm dòng này để cho phép gửi dữ liệu JSON qua body
server.use(jsonServer.bodyParser);

server.use(function (req, res, next) {
  if (
    req.method === "POST" ||
    req.method === "PUT" ||
    req.method === "PATCH" ||
    req.method === "DELETE"
  ) {
    // Chuyển đổi các phương thức POST, PUT, PATCH, DELETE thành GET và di chuyển dữ liệu sang query params
    // Điều này sẽ khiến JSON Server hiểu rằng đó là yêu cầu GET
    req.method = "GET";
    req.query = req.body;
  }
  // Tiếp tục đến router của JSON Server
  next();
});

server.use(router);
server.listen(3000, function () {
  console.log("JSON Server is running");
});
