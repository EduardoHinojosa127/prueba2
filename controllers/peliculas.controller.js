// controllers/peliculasController.js

const Pelicula = require('../models/pelicula');

const getAllPeliculas = (req, res) => {
  Pelicula.find({})
    .populate('categoria')
    .exec()
    .then((peliculas) => {
      res.json(peliculas);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

const getPeliculaById = (req, res) => {
  const id = req.params.id;
  Pelicula.findById(id)
    .populate('categoria')
    .exec()
    .then((pelicula) => {
      if (pelicula) {
        res.json(pelicula);
      } else {
        res.status(404).json({ error: 'Pelicula not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

const createPelicula = (req, res) => {
  const newPelicula = req.body;
  const pelicula = new Pelicula(newPelicula);
  pelicula
    .save()
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

const updatePelicula = (req, res) => {
  const id = req.params.id;
  const updatedPelicula = req.body;
  Pelicula.findByIdAndUpdate(id, updatedPelicula, { new: true })
    .then((pelicula) => {
      if (pelicula) {
        res.sendStatus(200);
      } else {
        res.status(404).json({ error: 'Pelicula not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

const deletePelicula = (req, res) => {
  const id = req.params.id;
  Pelicula.findByIdAndDelete(id)
    .then((pelicula) => {
      if (pelicula) {
        res.sendStatus(204);
      } else {
        res.status(404).json({ error: 'Peliculanot found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

module.exports = {
  getAllPeliculas,
  getPeliculaById,
  createPelicula,
  updatePelicula,
  deletePelicula,
};
