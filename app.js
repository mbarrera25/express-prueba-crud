const express = require('express');
const productoRouter = require('./routes/produtcRoute');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api', authRoutes);
app.use('/productos', productoRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
