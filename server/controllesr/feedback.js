const db = require("../db");

class FeetbackController {
  async createFeedback(req, res) {
    const ts = new Date().toISOString().split("T")[0];
    console.log('ts', ts);
    console.log(ts);
    const { id_worker, rating, comment, reasons_id } = req.body;
    const feetback = await db.query(
      "INSERT INTO feedback (comment, rating, id_worker, reasons_id, ts) values ($1, $2, $3, $4, $5) RETURNING *",
      [comment, rating, id_worker, reasons_id, ts]
    );
    console.log(feetback.rows[0])
    res.json(feetback.rows[0]);
  }

  async getFeedback(req, res) {
    const reasons = await db.query(
      `SELECT feedback.id AS feedback_id, comment, rating, ts, name, title FROM 
      feedback 
      JOIN worker ON 
      feedback.id_worker = worker.id 
      LEFT JOIN reason_list ON feedback.reasons_id = reason_list.id
      ORDER BY ts DESC
      `
    );
    res.json(reasons.rows);
  }

  async getFeedbackTest(req, res) {
    const reasons = await db.query("SELECT rating, ts FROM feedback");
    res.json(reasons.rows);
  }

  async getFeedbackDaysAndRartind(req, res) {
    const reasons = await db.query(
      `SELECT 
      ts, name, rating 
      FROM feedback
      JOIN worker ON 
      feedback.id_worker = worker.id
      ORDER BY ts
      `
    );
    res.json(reasons.rows);
  }

  async getFeedbackByWorker(req, res) {
    const id = req.params.id;
    const posts = await db.query(
      "SELECT * FROM feedback where id_worker = $1",
      [id]
    );
    res.json(posts.rows);
  }

  async getReasonsByWorker(req, res) {
    const id = req.params.id;
    const posts = await db.query(
      "SELECT title, rating, name FROM feedback JOIN worker ON feedback.id_worker = worker.id JOIN reason_list ON feedback.reasons_id = reason_list.id where id_worker = ($1)",
      [id]
    );
    res.json(posts.rows);
  }

  async getFeedbackByReasons(req, res) {
    const id = req.params.id;
    const posts = await db.query(
      `SELECT title, 
    rating, 
    ts, 
    name
    FROM feedback 
    JOIN worker ON 
    feedback.id_worker = worker.id 
    JOIN reason_list ON 
    feedback.reasons_id = reason_list.id
    where reasons_id = ($1)`,
      [id]
    );
    res.json(posts.rows);
  }

  async getFeedbackTest(req, res) {
    const posts = await db.query(
      `SELECT reason_list.title, COUNT(*) FROM feedback
      JOIN reason_list ON 
      feedback.reasons_id = reason_list.id 
      where id_worker = $1
      GROUP BY reason_list.title
      `, ['1']
    );
    res.json(posts.rows);
  }
}

module.exports = new FeetbackController();
