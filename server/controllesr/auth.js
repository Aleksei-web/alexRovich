const session = require("express-session");
const sha256 = require("sha256");
const db = require("../db");

class AuthController {
  async createrUser(req, res) {
    // создать usera
    try {
      const { user_name, password } = req.body;
      const newUser = await db.query(
        `INSERT INTO users (user_name, password) values ($1, $2) RETURNING *`,
        [user_name, sha256(password)]
      );
      res.json(newUser.rows[0]);
    } catch (error) {
      console.log(error.message);
      res.json(error.message);
    }
  }

  async getUsers(req, res) {
    const reasons = await db.query("SELECT * FROM users");
    res.json(reasons.rows);
  }

  async login(req, res) {
    console.log("one", req.session);
    try {
      const { user_name, password } = req.body;
      const reason = await db.query(
        "SELECT * FROM users where user_name = $1",
        [user_name]
      );
      if (reason.rows[0] && reason.rows[0].password === sha256(password)) {
        req.session.user = user_name;
        req.session.admin = true;
        req.session.save()
        console.log("two", req.session); 
        
        res.send(req.session);
      } else {
        res.json("не верные данные");
      }
    } catch (error) {
      console.log(error.message);
      res.json(error.message);
    }
  }

  async logout(req, res) {
    console.log("logout", req.session);
    req.session.destroy(() => {
      res.clearCookie('connect.sid', { path: '/' });
      return res.sendStatus(200);
    });
  }
}

module.exports = new AuthController();
