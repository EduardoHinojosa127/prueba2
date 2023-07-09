// app.js (o index.js)
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const { upladFile, getFiles, getFile, deleteFile, getFileUrl, getFile2 } = require('./s3.js');
const cors = require('cors');
const fs = require('fs');
const cron = require('node-cron');

// Conectarse a la base de datos de MongoDB
mongoose.connect('mongodb://mongodb_container:27017/api_bd', {
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
  try {
    const file = req.files.file;
  
    // Establecer los encabezados en la respuesta
    res.setHeader('Content-Type', file.mimetype);
    res.setHeader('Content-Disposition', 'inline');
  
    // Imprimir los encabezados en la consola
    console.log('Content-Type:', res.getHeader('Content-Type'));
    console.log('Content-Disposition:', res.getHeader('Content-Disposition'));
  
    const result = await upladFile(file);
  
    res.send(result);
  } catch (error) {
    console.error('Error al subir el archivo:', error);
    res.status(500).send('Error al subir el archivo');
  }
});


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

  try {
    await deleteFile(fileUrl);
    res.json({ message: 'Archivo eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el archivo:', error);
    res.status(500).json({ error: 'Ocurrió un error al eliminar el archivo' });
  }
});

cron.schedule('0 * * * *', () => {
  const tempDir = './uploads';
  fs.readdir(tempDir, (err, files) => {
    if (err) {
      console.error('Error al leer la carpeta de archivos temporales:', err);
      return;
    }
    for (const file of files) {
      fs.unlinkSync(`${tempDir}/${file}`);
      console.log(`Archivo temporal eliminado: ${file}`);
    }
  });
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
