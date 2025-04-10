const express = require('express');
const path = require('path');

const router = express.Router();

// Serve static HTML pages
router.get('/:page', (req, res) => {
  const page = req.params.page;
  const filePath = path.join(__dirname, '../views', `${page}.html`);
  res.sendFile(filePath, err => {
    if (err) {
      res.status(404).send('Page not found');
    }
  });
});

module.exports = router;
