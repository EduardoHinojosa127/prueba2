const { S3Client, PutObjectCommand, ListObjectsCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');

const client = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: 'AKIAVRCTWRTN6DIEWG4F',
        secretAccessKey: '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'
    },
})

async function upladFile(file) {
    if (!file) {
      throw new Error('No se proporcionó ningún archivo');
    }
  
    const stream = fs.createReadStream(file.tempFilePath);
    const upladParams = {
      Bucket: 'multimediapfinal',
      Key: file.name,
      Body: stream
    };
  
    try {
      const command = new PutObjectCommand(upladParams);
      const result = await client.send(command);
      
      // Eliminar el archivo temporal después de subirlo
      fs.unlink(file.tempFilePath, (err) => {
        if (err) {
          console.error('Error al eliminar el archivo temporal:', err);
        }
      });
  
      return result;
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      throw new Error('Error al subir el archivo');
    }
  }

async function getFiles() {
    const command = new ListObjectsCommand({
        Bucket: 'multimediapfinal'
    })
    return await client.send(command)
}

async function getFile(filename) {
    const command = new GetObjectCommand({
        Bucket: 'multimediapfinal',
        Key: filename
    })
    return await client.send(command)
}
async function getFile2(url) {
    // Extraer el nombre del archivo de la URL
    const fileName = extractFileNameFromUrl(url);
  
    const command = new GetObjectCommand({
      Bucket: 'multimediapfinal',
      Key: fileName
    });
  
    return await client.send(command);
  }
  

  async function deleteFile(filename) {
    const command = new DeleteObjectCommand({
      Bucket: 'multimediapfinal',
      Key: filename
    });
    return await client.send(command);
  }
  
  function getFileUrl(filename) {
    const bucketName = 'multimediapfinal'; // Nombre de tu bucket en S3
    const url = `https://${bucketName}.s3.amazonaws.com/${filename}`;
  
    return url;
  }
  function extractFileNameFromUrl(url) {
    const parts = url.split('/');
    return parts[parts.length - 1];
  }
  

module.exports = {
    upladFile,
    getFiles,
    getFile,
    deleteFile,
    getFileUrl,
    getFile2
}