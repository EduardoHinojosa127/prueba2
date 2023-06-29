// controllers/categoriasController.js

const Categoria = require('../models/categoria');

const getAllCategorias = (req, res) => {
  Categoria.find({})
    .then((categorias) => {
      res.json(categorias);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

const getCategoriaById = (req, res) => {
  const id = req.params.id;
  Categoria.findById(id)
    .then((categoria) => {
      if (categoria) {
        res.json(categoria);
      } else {
        res.status(404).json({ error: 'Categoría not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

const createCategoria = (req, res) => {
  const newCategoria = req.body;
  const categoria = new Categoria(newCategoria);
  categoria
    .save()
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

const updateCategoria = (req, res) => {
  const id = req.params.id;
  const updatedCategoria = req.body;
  Categoria.findByIdAndUpdate(id, updatedCategoria, { new: true })
    .then((categoria) => {
      if (categoria) {
        res.sendStatus(200);
      } else {
        res.status(404).json({ error: 'Categoría not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

const deleteCategoria = (req, res) => {
  const id = req.params.id;
  Categoria.findByIdAndDelete(id)
    .then((categoria) => {
      if (categoria) {
        res.sendStatus(204);
      } else {
        res.status(404).json({ error: 'Categoría not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

module.exports = {
  getAllCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
};
