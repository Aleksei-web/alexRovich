const db = require("../db");

class AdminController {
  async createrReason(req, res) {
    // создать причину
    const { title } = req.body;
    const newReason = await db.query(
      `INSERT INTO reason_list (title) values ($1) RETURNING *`,
      [title]
    );
    res.json(newReason.rows[0]);
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
    const id = req.params.id;
    const reason = await db.query("DELETE FROM reason_list where id = $1", [
      id,
    ]);
    res.json(reason.rows[0]);
  }
}

module.exports = new AdminController();
