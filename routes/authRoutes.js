const express = require('express');
const { login, register } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', login);
router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Este es un recurso protegido', user: req.user });
});
router.post('/register', register);

module.exports = router;