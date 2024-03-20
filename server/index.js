const express = require('express')
require('dotenv').config()

const app = express()
const port = process.env.PORT

app.use(express.json) // đọc data client gửi lên theo kiểu json
app.use(express.urlencoded({extended: true})) // phân tích dữ liệu dưới dạng application/x-www-form-urlencoded từ các post put

app.use('/', (req, res) => {res.send('server on')})

app.listen(port, () =>{
    console.log('start server with port: ' + port);
})