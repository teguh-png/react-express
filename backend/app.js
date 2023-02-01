const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const productRouter = require('./routes/ProductRoute');

const app = express();
mongoose.connect('mongodb://eduwork:asdasdasd@localhost:27017/react_express?authSource=admin');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => console.log('server database terhubung'));

app.use(cors());
app.use(express.json());
app.use(productRouter);

app.use((req, res, next) => {
  res.status(404);
  res.send({
    status: 'failed',
    message: 'Resource ' + req.originalUrl + ' Not Found',
  });
});
app.listen(3002, () => console.log('Server: http://localhost:3002'));
