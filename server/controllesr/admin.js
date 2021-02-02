const db = require("../db");

class AdminController {
  async createrReason(req, res) {
    // создать причину или изменить
    const { title, id } = req.body;
       if(!!id) {
      const reason = await db.query(
        "UPDATE reason_list set title = $1 where id = $2 RETURNING *",
        [title, id]
      );
      res.json(reason.rows[0]);
    } else {
      const newReason = await db.query(
        `INSERT INTO reason_list (title) values ($1) RETURNING *`,
        [title]
      );
      res.json(newReason.rows[0]);
    }
  }

  async getReason(req, res) {
    console.log('reasons', req.session);
    const reasons = await db.query("SELECT * FROM reason_list");
    res.json(reasons.rows);
  }

  async getOneReason(req, res) {
    const id = req.params.id;
    const reason = await db.query("SELECT * FROM reason_list where id = $1", [
      id,
    ]);
    res.json(reason.rows[0]);
  }

  async updateReason(req, res) {
    const { id, title } = req.body;
    const reason = await db.query(
      "UPDATE reason_list set title = $1 where id = $2 RETURNING *",
      [title, id]
    );
    res.json(reason.rows[0]);
  }

  async deleteReason(req, res) {
      try {
        const id = req.params.id;
        const reason = await db.query("DELETE FROM reason_list where id = $1", [
          id,
        ]);
        res.json(reason.rows[0]);      
      } catch (error) {
        console.log(error.message);
        res.send({error: error.message})
      }
   }
}

module.exports = new AdminController();
