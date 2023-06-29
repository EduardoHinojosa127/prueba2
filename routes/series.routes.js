// routes/seriesRoutes.js

const express = require('express');
const router = express.Router();
const seriesController = require('../controllers/series.controller');

router.get('/', seriesController.getAllSeries);
router.get('/:id', seriesController.getSerieById);
router.post('/', seriesController.createSerie);
router.put('/:id', seriesController.updateSerie);
router.delete('/:id', seriesController.deleteSerie);
router.post('/:id/temporadas', seriesController.addTemporadaToSerie);
router.post('/temporadas/:id/episodios', seriesController.addEpisodioToTemporada);

module.exports = router;
