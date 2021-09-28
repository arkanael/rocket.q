const Database = require("./config");

const initDb = {
  async init() {
    const db = await Database();

    try {
      await db.exec(`CREATE TABLE rooms (
                id INT PRIMARY KEY,
                pass TEXT
            )`);

      await db.exec(`CREATE TABLE questions(
                    id  INTEGER PRIMARY KEY AUTOINCREMENT,
                    title  TEXT,
                    read INT,
                    room INT          
            )`);
            
    } catch (error) {
      console.error(error);
      process.exit(1);
    }

    await db.close();

    console.log("This will not be printed.");
  },
};

initDb.init();
