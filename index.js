const express = require('express');
const mongoose = require('mongoose');

// Conectarse a la base de datos de MongoDB
mongoose.connect('mongodb://localhost:27017/mi-base-de-datos', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch(error => {
    console.error('Error al conectar a la base de datos', error);
  });

// Definir el esquema de usuarios
const userSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  contraseña: String
});

// Crear un modelo de usuarios basado en el esquema
const User = mongoose.model('User', userSchema);

// Configurar Express
const app = express();
app.use(express.json());

// Ruta para obtener todos los usuarios
app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await User.find();
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener los usuarios', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

// Ruta para crear un nuevo usuario
app.post('/usuarios', async (req, res) => {
  try {
    const usuario = new User(req.body);
    await usuario.save();
    res.json(usuario);
  } catch (error) {
    console.error('Error al crear el usuario', error);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
});

// Ruta para obtener un usuario por su ID
app.get('/usuarios/:id', async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id);
    res.json(usuario);
  } catch (error) {
    console.error('Error al obtener el usuario', error);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
});

// Ruta para actualizar un usuario por su ID
app.put('/usuarios/:id', async (req, res) => {
  try {
    const usuario = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(usuario);
  } catch (error) {
    console.error('Error al actualizar el usuario', error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
});

// Ruta para eliminar un usuario por su ID
app.delete('/usuarios/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el usuario', error);
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
