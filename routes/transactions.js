const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('New running'));

module.exports = router;
