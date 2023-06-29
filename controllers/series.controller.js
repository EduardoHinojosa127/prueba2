// controllers/seriesController.js

const Serie = require('../models/serie');
const Temporada = require('../models/temporada');
const Episodio = require('../models/episodio');

// Obtener todas las series
const getAllSeries = (req, res) => {
  Serie.find({})
    .populate('temporadas')
    .exec()
    .then((series) => {
      res.json(series);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

// Obtener una serie por su ID
const getSerieById = (req, res) => {
  const id = req.params.id;
  Serie.findById(id)
    .populate('temporadas')
    .exec()
    .then((serie) => {
      if (serie) {
        res.json(serie);
      } else {
        res.status(404).json({ error: 'Serie not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

// Crear una nueva serie
const createSerie = (req, res) => {
  const { titulo, descripcion, genero, director, elenco, temporadas } = req.body;
  const serie = new Serie({
    titulo,
    descripcion,
    genero,
    director,
    elenco,
    temporadas,
  });

  serie
    .save()
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

// Actualizar una serie existente
const updateSerie = (req, res) => {
  const id = req.params.id;
  const { titulo, descripcion, genero, director, elenco, temporadas } = req.body;

  Serie.findByIdAndUpdate(
    id,
    { titulo, descripcion, genero, director, elenco, temporadas },
    { new: true }
  )
    .then((serie) => {
      if (serie) {
        res.sendStatus(200);
      } else {
        res.status(404).json({ error: 'Serie not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

// Eliminar una serie existente
const deleteSerie = (req, res) => {
  const id = req.params.id;

  Serie.findByIdAndDelete(id)
    .then((serie) => {
      if (serie) {
        res.sendStatus(204);
      } else {
        res.status(404).json({ error: 'Serie not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

const addTemporadaToSerie = (req, res) => {
    const serieId = req.params.id;
    const { numero } = req.body;
  
    const temporada = new Temporada({ numero });
  
    temporada
      .save()
      .then((temporada) => {
        Serie.findByIdAndUpdate(
          serieId,
          { $push: { temporadas: temporada._id } },
          { new: true }
        )
          .then(() => {
            res.sendStatus(200);
          })
          .catch((err) => {
            res.status(500).json({ error: 'Internal server error' });
          });
      })
      .catch((err) => {
        res.status(500).json({ error: 'Internal server error' });
      });
  };
  
  // Agregar un episodio a una temporada existente
  const addEpisodioToTemporada = (req, res) => {
    const temporadaId = req.params.id;
    const { titulo, descripcion, duracion, fechaLanzamiento } = req.body;
  
    const episodio = new Episodio({ titulo, descripcion, duracion, fechaLanzamiento });
  
    episodio
      .save()
      .then((episodio) => {
        Temporada.findByIdAndUpdate(
          temporadaId,
          { $push: { episodios: episodio._id } },
          { new: true }
        )
          .then(() => {
            res.sendStatus(200);
          })
          .catch((err) => {
            res.status(500).json({ error: 'Internal server error' });
          });
      })
      .catch((err) => {
        res.status(500).json({ error: 'Internal server error' });
      });
  };

module.exports = {
  getAllSeries,
  getSerieById,
  createSerie,
  updateSerie,
  deleteSerie,
  addTemporadaToSerie,
  addEpisodioToTemporada,
};
