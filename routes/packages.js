const express = require('express');
const router = express.Router();
const packagesCtrl = require('../controllers/packages');


//CREATE PACKAGES
router.post('/create',packagesCtrl.create)

module.exports = router;