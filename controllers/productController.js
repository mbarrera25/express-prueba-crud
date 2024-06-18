const Producto = require('../models/product');

const crearProducto = async (req, res) => {
    console.log(req.body);
  const { nombre, precio, stock } = req.body;
  const producto = new Producto(null, nombre, precio, stock);
  await producto.crear();
  res.json({ mensaje: 'Producto creado exitosamente' });
};

const leerProducto = async (req, res) => {
    const id = parseInt(req.params.id);
    let producto = new Producto()
    producto = await producto.leer(id);
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json(producto);
  };
  
  const actualizarProducto = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, precio, stock } = req.body;
    let producto = new Producto()
    producto = await producto.leer(id);
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    producto.nombre = nombre;
    producto.precio = precio;
    producto.stock = stock;
    await producto.actualizar();
    res.json({ mensaje: 'Producto actualizado exitosamente' });
  };
  
  const eliminarProducto = async (req, res) => {
    const id = parseInt(req.params.id);
    let producto = new Producto()
    await producto.eliminar(id);
    res.json({ mensaje: 'Producto eliminado exitosamente' });
  };
  
  module.exports = {
    crearProducto,
    leerProducto,
    actualizarProducto,
    eliminarProducto
  };
  