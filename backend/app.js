const { PORT = 3000 } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
// eslint-disable-next-line import/no-unresolved
const cors = require('cors');
const usersRoutes = require('./routes/usersRoutes');
const cardsRoutes = require('./routes/cardsRouters');
const auth = require('./middlewares/auth');
const { errorUrl, checkErrorsAll } = require('./errors/errors');
const { login, createUser } = require('./controllers/usersControllers');
const redex = require('./utils/utils');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const corsOptions = {
//   origin: 'https://expressmesto.students.nomoredomains.sbs',
//   credentials: true,
//   optionsSuccessStatus: 200,
// };

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
})
  .then(() => console.log('Connected db'))
  .catch((e) => console.log(e));

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.path} ${JSON.stringify(req.body)}`);
  next();
});

app.use(requestLogger);
app.use(cors());

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(redex),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).unknown(true),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).unknown(true),
}), login);

app.use('/', auth, usersRoutes);
app.use('/', auth, cardsRoutes);
app.use('/*', errorUrl);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  checkErrorsAll(err, req, res);
  next();
});

app.listen(PORT, () => {
  console.log(`Server listen on ${PORT}`);
});
