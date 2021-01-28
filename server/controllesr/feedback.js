const db = require("../db");

class FeetbackController {

  async createFeedback(req, res) {
    const { id_worker, rating, comment, reasons_id } = req.body;
    const feetback = await db.query(
      "INSERT INTO feedback (comment, rating, id_worker, reasons_id) values ($1, $2, $3, $4) RETURNING *",
      [comment, rating, id_worker, reasons_id]
    );
    res.json(feetback.rows[0]);
  }

  async getFeedback(req, res) {
    const reasons = await db.query("SELECT * FROM feedback JOIN worker ON feedback.id_worker = worker.id JOIN reason_list ON feedback.reasons_id = reason_list.id");
    res.json(reasons.rows);
  }

  async getFeedbackTest(req, res) {
    const reasons = await db.query("SELECT rating, ts FROM feedback");
    res.json(reasons.rows);
  }

  async getFeedbackDaysAndRartind(req, res) {
    const reasons = await db.query("SELECT ts, name, rating FROM feedback JOIN worker ON feedback.id_worker = worker.id");
    res.json(reasons.rows);
  }

  async getFeedbackByWorker(req, res) {
		const id = req.params.id;
		const posts = await db.query('SELECT * FROM feedback where id_worker = $1', [id])
		res.json(posts.rows)
  }
  
  async getReasonsByWorker(req, res) {
		const id = req.params.id;
		const posts = await db.query('SELECT title, rating, name FROM feedback JOIN worker ON feedback.id_worker = worker.id JOIN reason_list ON feedback.reasons_id = reason_list.id where id_worker = ($1)', [id])
		res.json(posts.rows)
  }
  
  async getFeedbackByReasons(req, res) {
		const id = req.params.id;
    const posts = await db.query(`SELECT title, 
    rating, 
    ts, 
    name
    FROM feedback 
    JOIN worker ON 
    feedback.id_worker = worker.id 
    JOIN reason_list ON 
    feedback.reasons_id = reason_list.id
    where reasons_id = ($1)`, 
    [id])
		res.json(posts.rows)
	}

}

module.exports = new FeetbackController();