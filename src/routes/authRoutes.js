const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

const { registerValidationRules, loginValidationRules } = require('../validation/validator');

router.post('/register', registerValidationRules(), authController.register);
router.post('/login',loginValidationRules(), authController.login);

module.exports = router;