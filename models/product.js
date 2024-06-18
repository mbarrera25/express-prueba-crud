const pool = require('../config/database');


class Producto {
  constructor(id, nombre, precio, stock) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
  }

  async crear() {
    const client = await pool.connect();
    try {
      const sql = `INSERT INTO productos (nombre, precio, stock) VALUES ($1, $2, $3) RETURNING *`;
      const values = [this.nombre, this.precio, this.stock];
      const res = await client.query(sql, values);
      this.id = res.rows[0].id;
      return this;
    } finally {
      client.release();
    }
  }

  async leer(id) {
    const client = await pool.connect();
    try {
      const sql = `SELECT * FROM productos WHERE id = $1`;
      const value = [id];
      const res = await client.query(sql, value);
      if (res.rows.length === 0) return null;
      const producto = new Producto(res.rows[0].id, res.rows[0].nombre, res.rows[0].precio, res.rows[0].stock);
      return producto;
    } finally {
      client.release();
    }
  }

  async actualizar() {
    const client = await pool.connect();
    try {
      const sql = `UPDATE productos SET nombre = $1, precio = $2, stock = $3 WHERE id = $4`;
      const values = [this.nombre, this.precio, this.stock, this.id];
      await client.query(sql, values);
    } finally {
      client.release();
    }
  }

  async eliminar() {
    const client = await pool.connect();
    try {
      const sql = `DELETE FROM productos WHERE id = $1`;
      const value = [this.id];
      await client.query(sql, value);
    } finally {
      client.release();
    }
  }
}

module.exports = Producto;
