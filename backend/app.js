require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;

const app = express();

const helmet = require('helmet');

const { createUser, login } = require('./controllers/user');
const { loginValidation, createUserValidation } = require('./middlewares/validate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const auth = require('./middlewares/auth');
const handleError = require('./middlewares/handleError');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('connected success');
  });

app.use(cors());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.use(requestLogger);

app.post('/signup', createUserValidation, createUser);

app.post('/signin', loginValidation, login);

app.use(auth);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(handleError);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server is running on port ${PORT}`);
});
