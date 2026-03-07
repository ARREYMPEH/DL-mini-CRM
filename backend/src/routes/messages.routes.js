const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messages.controller');

// Note: These will be mounted under /prospects in app.js for context
router.get('/:id/messages', messagesController.getMessagesByProspectId);
router.post('/:id/messages', messagesController.createMessage);

// DELETE /messages/:id (will be mounted under /messages in app.js)
router.delete('/:id', messagesController.deleteMessage);

module.exports = router;
