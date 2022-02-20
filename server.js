const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const parser = require('body-parser')

const corsOptions = {
  origin: "https://gallerytse.vercel.app",
};
const PORT = '8080'
const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(parser.json({strict: false}))
const db = require('./app/models');

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connecté à la base de données");
  })
  .catch(err => {
    console.log("Impossible de se connecter à la base de données\n", err);
    process.exit();
  });

require('./app/routes/photo.routes')(app);
app.use("/images", express.static('public/uploads'))
app.listen(PORT, () => {
  console.log(`Le serveur a démarré sur le port ${PORT}`);
});
