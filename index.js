// app.js (o index.js)
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const { upladFile, getFiles, getFile, deleteFile, getFileUrl, getFile2 } = require('./s3.js');
const cors = require('cors');
const fs = require('fs');

// Conectarse a la base de datos de MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/nombre_de_tu_base_de_datos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(bodyParser.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './uploads'
}))
app.use(cors());
app.get('/', (req, res) => {
  res.json({message: 'Welcome'})
})

app.post('/files', async (req, res) => {
  const result = await upladFile(req.files.file)
  res.json({result})
})

app.get('/files', async (req, res) => {
  const files = await getFiles();
  const filesWithUrl = files.Contents.map(file => {
    const fileName = file.Key;
    const fileUrl = getFileUrl(fileName);
    return {
      name: fileName,
      url: fileUrl
    };
  });
  res.json(filesWithUrl);
});


app.get('/files/*', async (req, res) => {
  const fileName = extractFileNameFromUrl(req.params[0]);
  const fileUrl = getFileUrl(fileName);
  
  // Realizar la lógica para encontrar el archivo correspondiente según la URL
  const result = await getFile2(fileUrl);

  if (result) {
    res.send({ metadata: result.$metadata, "name": fileName, "url": fileUrl });
  } else {
    res.status(404).json({ error: 'Archivo no encontrado' });
  }
});

function extractFileNameFromUrl(url) {
  const parts = url.split('/');
  return parts[parts.length - 1];
}

app.delete('/files/*', async (req, res) => {
  const fileUrl = req.params[0];

  // Realizar la lógica para obtener el nombre del archivo a partir de la URL
  const fileName = extractFileNameFromUrl(fileUrl);

  try {
    await deleteFile(fileName);
    res.json({ message: 'Archivo eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el archivo:', error);
    res.status(500).json({ error: 'Ocurrió un error al eliminar el archivo' });
  }
});


// Rutas
const categoriasRoutes = require('./routes/categorias.routes');
const peliculasRoutes = require('./routes/peliculas.routes');
const seriesRoutes = require('./routes/series.routes');
app.use('/categorias', categoriasRoutes);
app.use('/peliculas', peliculasRoutes);
app.use('/series', seriesRoutes);

// Puerto de escucha
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
