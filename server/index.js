const express = require('express');
const session = require('express-session');
// const cookieParser = require("cookie-parser");
// const PostgreSqlStore = require('connect-pg-simple')(session);


const {readdirSync} = require('fs');
const cors = require('cors');
const isAdminMiddleware = require('./middleware/authMiddleware');

const app = express();

// const sessionOptions = {
//   secret: "secret",
//   resave : true,
//   saveUninitialized : false,
//   store : new PostgreSqlStore({
//     conString: "postgres://postgres:root@localhost:5432/quality_test"
//   }),
//   }
  
  
  
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'fdlk',
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(isAdminMiddleware)

app.get('/', (req, res) => {
  req.session.user = 'user'
  res.json(req.session)
})

readdirSync('./routes').map((r) => 
  app.use('/', require('./routes/' + r)))

app.listen(8080, () => {
  console.log('server running on port 8080');
})