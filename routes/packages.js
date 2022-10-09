const express = require('express');
const router = express.Router();
const packagesCtrl = require('../controllers/packages');


//CREATE PACKAGES
router.post('/create',packagesCtrl.create)

//GET ALL PACKAGES
router.get('/',packagesCtrl.getAll)

//GET ALL PACKAGES ASSOCIATED WITH PARAMS USER ID 
router.get('/:id',packagesCtrl.getByUserId)

//GET ALL PACKAGES ASSOCIATED WITH LOGGED IN USER ID
router.get('/:id',packagesCtrl.getByUser)

//DELETE PACKAGE BY PARAMS ID
router.delete('/:id',packagesCtrl.deleteById)

module.exports = router;