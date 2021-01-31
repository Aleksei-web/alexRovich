const express = require("express");
const session = require("express-session");
const db = require("./db");
const cookieParser = require("cookie-parser");
const PostgreSqlStore = require("connect-pg-simple")(session);

const { readdirSync } = require("fs");
const cors = require("cors");
// const isAdminMiddleware = require("./middleware/authMiddleware");
const { PORT } = require("./config");
const isAdminMiddleware = require("./middleware/adminMiddleware");

const app = express();

const sessionOptions = {};

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: false,
    store: new PostgreSqlStore({
      conString: "postgres://postgres:root@localhost:5432/quality_test",
    }),
  })
);


readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

db.connect(() => {
  console.log("connected db");
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
