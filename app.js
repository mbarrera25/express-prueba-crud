const express = require('express');
const productoRouter = require('./routes/produtcRoute');

const app = express();

app.use(express.json());
app.use('/productos', productoRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
