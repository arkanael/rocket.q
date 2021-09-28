const Database = require("../db/config");
module.exports = {
  async create(req, res) {
    let roomId = "";
    let isRoom = true;

    const db = await Database();
    const pass = req.body.password;

    while (isRoom) {
      /*GERA O NUMERO DA SALA*/
      for (var i = 0; i < 6; i++) {
        roomId += Math.floor(Math.random() * 10).toString();
      }

      /*Verfica se o numero da sala já existe*/
      try {
        const roomsExistIds = await db.all(`SELECT id FROM rooms`);

        isRoom = roomsExistIds.some((roomsExistId) => roomsExistId === roomId);

        if (!isRoom) {
          /*Inserir a sala no banco*/
          try {
            await db.run(`
              INSERT INTO rooms(id, pass)
                  VALUES(${parseInt(roomId)}, ${pass})
          `);
          } catch (error) {
            console.error(error);
            process.exit(1);
          }
        }
      } catch (error) {
        console.error(error);
        process.exit(1);
      }
    }

    await db.close();

    res.redirect(`/room/${roomId}`);
  },

  async open(req, res) {
    const db = await Database();
    try {
      const roomId = req.params.room;
      const questions = await db.all(
        `SELECT * FROM questions WHERE room = ${roomId}`
      );
    
      res.render("room", { roomId: roomId, questions: questions });
      await db.close();
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  },

  enter(req, res) {
    const roomId = req.body.roomId;

    res.redirect(`/room/${roomId}`);
  },
};
