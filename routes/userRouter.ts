const express1 = require('express')
const router = express1.Router()
import userController from '../controller/userController'
import validation  from '../middlewares/validation'

router.post('/login',validation.userValidation,userController.login)
router.post('/register',validation.userValidation,userController.register)

module.exports = router