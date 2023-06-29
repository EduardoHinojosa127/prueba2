// routes/peliculasRoutes.js

const express = require('express');
const router = express.Router();
const peliculasController = require('../controllers/peliculas.controller');

router.get('/', peliculasController.getAllPeliculas);
router.get('/:id', peliculasController.getPeliculaById);
router.post('/', peliculasController.createPelicula);
router.put('/:id', peliculasController.updatePelicula);
router.delete('/:id', peliculasController.deletePelicula);

module.exports = router;
