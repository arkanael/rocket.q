const Database = require("../db/config");

module.exports = {
  async index(req, res) {
    const db = await Database();
    const roomId = req.params.room;
    const questionId = req.params.question;
    const action = req.params.action;
    const password = req.body.password;

    /*verifcar a senha */
    try {
      const verifyRoom = await db.get(`SELECT rooms WHERE id = ${roomId}`);
      if (verifyRoom.pass == password) {
          if(action == "delete" ){
              await db.run(`DELETE FROM questions WHERE id = ${questionId}`);
          }else if(action == "check"){
            await db.run(`UPDATE question SET read = 1 WHERE id = ${questionId}`);
        }
        res.redirect(`/room/${roomId}`);
      }else{
          res.render('passincorrect', {roomId: roomId})
      }
    } catch (error) {
      console.error(error);
    }

  },

  async create(req, res) {
    const db = await Database();
    const question = req.body.question;
    const roomId = req.params.room;

    try {
      await db.run(`
                INSERT INTO questions(title, room, read)
                    VALUES("${question}", ${roomId}, 0)
                
                `);
    } catch (error) {
      console.error(error);
      process.exit(1);
    } finally {
      await db.close();
    }

    res.redirect(`/room/${roomId}`);
  },
};
