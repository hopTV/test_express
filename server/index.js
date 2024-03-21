const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const initRouter = require("./routes");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 5671;

app.use(cookieParser());
app.use(express.json()); // đọc data client gửi lên theo kiểu json
app.use(express.urlencoded({ extended: true })); // phân tích dữ liệu dưới dạng application/x-www-form-urlencoded từ các post put
dbConnect();

initRouter(app);

app.listen(port, () => {
  console.log("start server with port: " + port);
});
