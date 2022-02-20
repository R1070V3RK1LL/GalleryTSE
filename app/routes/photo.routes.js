const multer = require("multer");
const fs = require('fs-extra')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let path = `./public/uploads`;
    fs.mkdirsSync(path);
    cb(null, path)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname  );
  },
});

const upload = multer({ storage: storage });

module.exports = (app) => {
  const photos = require("../controllers/photo.controller.js");

  var router = require("express").Router();

  // Créer une photo
  router.post("/", upload.single('photo'), photos.create);

  // Commenter une photo
  router.post("/:id/comment", photos.comment);

  // Récupèrer toutes les photos
  router.get("/", photos.findAll);

  // Trouver une photo à partir du commentaire
  router.get("/comment", photos.findByComment);

  // Récupèrer une photo à partir de son id
  router.get("/:id", photos.findOne);

  // Mettre à jour la photo avec l'id "id"
  router.put("/:id", photos.update);

  // Supprimer la photo d'identifiant "id"
  router.delete("/:id", photos.delete);

  // Supprimer toutes les photos
  router.delete("/", photos.deleteAll);

  app.use("/api/photos", router);
};
