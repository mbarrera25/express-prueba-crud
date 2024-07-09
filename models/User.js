const pool = require("../config/database");
const jwt = require("jsonwebtoken");
const responseHandler = require("../models/ResponseHandler")
class User {
  constructor(id, username, password, name, email) {
    this.id = id;
    this.usename = username;
    this.password = password;
    this.name = name;
    this.email = email;
  }

  async login(res, username, password){
    const client = await pool.connect();
    try{
      const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);
      client.release();
      if (result.rows.length === 0) {
        return responseHandler.unauthorized(res,'Invalid credentials')
        //return res.status(401).json({ message: 'Invalid credentials' });
      }
      const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log(user);
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      return responseHandler.unauthorized(res,'Invalid credentials')
      //return res.status(401).json({ message:  });
    }
    const accessToken = generateToken({ name: username });
    res.json({ accessToken });
    }catch(error){
      return responseHandler.serverError(res,error);
    }
  }

  async crear(res) {
    const client = await pool.connect();
    try {
      const sql = `INSERT INTO users (username, password, name, email) VALUES ($1, $2, $3, $4) RETURNING *`;
      const values = [this.usename, this.password, this.name, this.email];
      const result = await client.query(sql, values);
      const newUser = result.rows[0];
      const token = jwt.sign(
        { id: newUser.id, username: newUser.username },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
    } catch (error) {
        if (error.code === '23505') { // Unique violation
          console.log(error);
          return responseHandler.conflict(res,error);
        }
        return responseHandler.serverError(res,error);
      } finally {
        client.release();
      }
  }
}



module.exports = User;
