import express from 'express';

const router = express.Router();

router.get('/get-flag', (req, res) => {
  const secretHeader = req.headers['x-secret-header'];
  if (secretHeader === 'CTF_SECRET') {
    res.json({ flag: 'CTF{backend_secret_flag}' });
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
});

export default router; 