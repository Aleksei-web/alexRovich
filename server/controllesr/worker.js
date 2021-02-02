const db = require("../db");

class WorkerController {
  async createWorker(req, res) {  // cоздать или редактировать работника
    const { name, id } = req.body;
    if(!!id) {
      const worker = await db.query(
        "UPDATE worker set name = $1 where id = $2 RETURNING *",
        [name, id]
      )
      res.json(worker.rows[0])
    } else {
      const newPerson = await db.query(
        `INSERT INTO worker (name) values ($1) RETURNING *`,
        [name]
      );
      res.json(newPerson.rows[0]);
    }
  }
  async getWorkers(req, res) {
    console.log('get workers', req.session);
    const workers = await db.query("SELECT * FROM worker");
    return res.json(workers.rows);
  }
  async getOneWorker(req, res) {
    const id = req.params.id;
    const worker = await db.query("SELECT * FROM worker where id = $1", [id]);
    res.json(worker.rows[0]);
  }

  async deleteWorker(req, res) {
    try {
      const id = req.params.id;
      const user = await db.query("DELETE FROM worker where id = $1", [id]);
      res.json(user.rows[0]);      
    } catch (error) {
      console.log(error.message);
      res.json({error: error.message})
    }
  }
}

module.exports = new WorkerController();
