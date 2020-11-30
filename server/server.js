require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./src/routes/auth.js');
const apiRouter = require('./src/routes/getUser.js');
const cors = require('cors');
const connectMongo = require('connect-mongo');
const passport = require('passport');
const session = require('express-session');
const dbConect = require('./src/config/db.js');
var cookieParser = require('cookie-parser');

require('./src/config/passport');
const path = require('path');

const MongoStore = connectMongo(session);

dbConect();

const app = express();
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 140,
      secure: false,
      httpOnly: true,
      key: 'racooncookie',
    },
    store: new MongoStore({
      mongooseConnection: mongoose.createConnection(process.env.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
  })
);
// app.use(sessionParser);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.set('view engine', 'hbs');

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/api', apiRouter);

const root = require('path').join(__dirname, '../', 'frontend', 'build');
app.use(express.static(root));
app.get('*', (req, res) => {
  res.sendFile('index.html', { root });
});

app.listen(process.env.PORT ?? 3001);
