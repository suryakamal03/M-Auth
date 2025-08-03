const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {userregister,userlogin} = require('./controller.js');
router.post('/register',userregister);
router.post('/login',userlogin);
module.exports = router
