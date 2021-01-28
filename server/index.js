const express = require('express');
const session = require('express-session');
const PostgreSqlStore = require('connect-pg-simple')(session);


const {readdirSync} = require('fs');
const cors = require('cors');

const app = express();

const sessionOptions = {
    secret: "secret",
    resave : true,
    saveUninitialized : false,
    store : new PostgreSqlStore({
    conString: "postgres://postgres:root@localhost:5432/quality_test"
  })
}



app.use(express.json())
app.use(cors())
app.use(session(sessionOptions))

// app.get("/", function(req, res){
//     if ( !req.session.views){
//       req.session.views = 1;
//     }else{
//       req.session.views += 1;
//     }
//     res.json({
//       "status" : "ok",
//       "frequency" : req.session.views
//     });
//   });



readdirSync('./routes').map((r) => 
  app.use('/', require('./routes/' + r)))

app.listen(8080, () => {
  console.log('server running on port 8080');
})