const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.set('trust proxy', true);
app.use(express.static('public'));

app.get('/', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const visita = `${new Date().toISOString()} - IP: ${ip}\n`;

  fs.appendFile('visitas.txt', visita, err => {
    if (err) console.error('Error al guardar IP:', err);
  });

  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/visitas', (req, res) => {
  fs.readFile('visitas.txt', 'utf8', (err, data) => {
    if (err) return res.status(500).send('No se pudo leer el archivo.');
    res.type('text/plain').send(data || 'Aún no hay visitas.');
  });
});

app.listen(port, () => {
  console.log(`Servidor en marcha en puerto ${port}`);
});
Haz clic en "Commit new file".

Ahora crea una carpeta llamada public/:

Haz clic en "Add file" → "Create new file"

En el nombre escribe:

pgsql
Copy
Edit
public/index.html
Pega algo como esto:

html
Copy
Edit
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Bienvenido</title>
</head>
<body>
  <h1>Hola visitante</h1>
  <p>Gracias por visitar esta página.</p>
</body>
</html>
