const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: '*',
  optionsCuccessStatus: 200
};
app.use(cors(corsOptions));

const multipartMiddleware = multipart({ uploadDir: './uploads' });
app.post('/upload', multipartMiddleware, (req, res) => {
  const files = req.files;
  res.json({ message: filesv });
})

app.use((err, req, res, next) => res.json({error: err.message}));

app.listen(8080, () => {
  console.log('Server port 8080');
});