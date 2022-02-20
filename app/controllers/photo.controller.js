const Image = require("../database/image.model");
const fs = require('fs')
const path = require('path')

// fonction d'ajout d'image
const addImage = async (title, filename) => {
  try {
    const imageAdded = await Image.create({
      title,
      filename,
      comment: "",
    });
    return imageAdded._id;
  } catch (err) {
    console.log("error:", err);
  }
};
// Téléverser une image
exports.create = async (req, res, next) => {
  try {
    console.log("Requête", req.file);
    const { originalname, filename } = req.file;
    const imgId = await addImage(originalname, filename);
    console.log("Image avec id:", imgId);
    res.status(200).send({ imgId });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// Ajouter un commentaire
exports.comment = async (req, res) => {
  const id = req.params.id;
  const { comment } = req.body;
  if (!id) {
    return res.status(400).send({
      message: "Id requis!",
    });
  }
  console.log("id de l'image à modifier: ", id);
  const image = await Image.find({ _id: id });
  console.log("image: ", image);
  const imgCommentee = await Image.updateOne(
    { _id: id },
    { $set: { comment } }
  );
  res.status(201).send(`l'image avec l'id : ${id} a été modifiée avec succès`);
};

// Récupérer toutes les images de la base
exports.findAll = (req, res) => {
  Image.find()
    .then((data) => {
      console.log({ data });
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Une erreur est survenue lors de la récupération des données",
      });
    });
};

// Trouver une image avec un id spécifique
exports.findOne = (req, res) => {
  const id = req.params.id;

  Image.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "L'image avec l'id " + id +"n'a pas été trouvée"});
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Erreur lors de la récupération de l'image dont l'id est:" + id });
    });
};

// Mettre à jour une image à partir de son id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Le champ ne peut être vide!",
    });
  }
  console.log("req: ", req.files);
  const id = req.params.id;
  const nouvelleImage = {
    title: req.file.filename,
    filename: req.file.originalname
  };
  Image.findByIdAndUpdate(id, nouvelleImage, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Impossible de mettre à jour l'image avec l'id: ${id}. L'image n'a pas été trouvée!`,
        });
      } else
        res.status(204).send({ message: "Image mise à jour" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erreur lors de l'actualisation de l'image d'id:" + id,
      });
    });
};

// Supprimer une image avec un id spécifique
exports.delete = (req, res) => {
  const id = req.params.id;

  Image.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Impossible de supprimer l'image avec l'id: ${id}. L'image n'a pas été trouvée!`,
        });
      } else {
        let path = `public/uploads/${data.filename}`
        fs.unlink(path, (err) => {
          if (err) {
            console.error(err)
            return
          }

          //file removed
        })
        res.send({
          message: "L'image a été supprimée avec succès!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Echec de la suppression de l'image d'id" + id,
      });
    });
};

// Supprimer toutes les images de la base
exports.deleteAll = (req, res) => {
  Image.deleteMany({})
    .then((data) => {
      let directory = 'public/uploads'
      fs.readdir(directory, (err, files) => {
        if (err) throw err;

        for (const file of files) {
          fs.unlink(path.join(directory, file), err => {
            if (err) throw err;
          });
        }
      });      res.send({
        message: `${data.deletedCount} Les images ont été supprimées avec succès!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue en tentant de supprimer toutes les images",
      });
    });
};

// Trouver une image à partir d'un commentaire
exports.findByComment = async (req, res) => {
  const { params } = req.query;
  let {comment} = JSON.parse(params)
  console.log({comment})
  const images = await Image.find({ comment:{$regex:comment} });
  console.log("images: ", images);
  if (!images) {
    res.status(404).send("Aucune photo trouvée");
  }
  res.status(200).send(images);
};
