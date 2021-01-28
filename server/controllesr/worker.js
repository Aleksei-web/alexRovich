const db = require("../db");

class WorkerController {
  async createWorker(req, res) {
    const { name} = req.body;
    const newPerson = await db.query(
      `INSERT INTO worker (name) values ($1) RETURNING *`,
      [name]
    );
    res.json(newPerson.rows[0]);
  }
  async getWorkers(req, res) {
    const workers = await db.query("SELECT * FROM worker");
    res.json(workers.rows);
  }
  async getOneWorker(req, res) {
    const id = req.params.id;
    const worker = await db.query("SELECT * FROM worker where id = $1", [id]);
    res.json(worker.rows[0]);
  }

  // async updateUser(req, res) {
  //   const { id, name, surname } = req.body;
  //   const user = await db.query(
  //     "UPDATE person set name = $1, surname = $2 where id = $3 RETURNING *",
  //     [name, surname, id]
  //   );
  //   res.json(user.rows[0]);
  // }

  async deleteWorker(req, res) {
		const id = req.params.id;
    const user = await db.query("DELETE FROM worker where id = $1", [id]);
    res.json(user.rows[0]);
	}
}

module.exports = new WorkerController();