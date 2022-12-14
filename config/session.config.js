const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const { DB } = require('./db.config');

const sessionMaxAge = process.env.SESSION_AGE;

const sessionConfig = expressSession({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      secure: process.env.COOKIE_SECURE === "true" || false,
      maxAge: 24 * 60 * 60 * 1000 * sessionMaxAge, 
      httpOnly: true,
    },
    store: new MongoStore({
      mongoUrl: DB,
      ttl: 24 * 60 * 60 * sessionMaxAge,
    }),
  });
  
  module.exports = sessionConfig;