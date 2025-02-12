const express = require('express')
const router = express.Router()
const RegisterController = require('../controllers/resgisterController')

router.post('/',RegisterController.handlerNewuser)

module.exports = router