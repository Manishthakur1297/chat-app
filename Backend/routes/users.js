const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const config = require('config')

const User = require('../models/User');
const auth = require('../middleware/auth')

const { viewProfile, listUsers }  = require('../controllers/users')


// @route       GET api/users
// @desc        User Profile
// @access      Private
router.get('/me', auth, viewProfile)


// @route       GET api/users
// @desc        GET ALL Users
// @access      Private
router.get('/', auth, listUsers)


module.exports = router;
