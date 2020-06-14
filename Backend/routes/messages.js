const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

const { conversations, conversationsQuery, privateMessage }  = require('../controllers/messages')


// @route       GET api/conversations
// @desc        Conversations Messages List
// @access      Private
router.get('/conversations', auth, conversations)


// @route       GET api/conversations/query
// @desc        GET ALL Conversations based on ID
// @access      Private
router.get('/conversations/query', auth, conversationsQuery)


// @route       POST api/conversations
// @desc        POST new conversations
// @access      Private
router.post('/conversations', auth, conversationsQuery)


module.exports = router;
