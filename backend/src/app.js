const express = require('express');
const cors = require('cors');
const prospectsRoutes = require('./routes/prospects.routes');
const messagesRoutes = require('./routes/messages.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Mounting prospects routes
app.use('/prospects', prospectsRoutes);

// Handling prospect-specific sub-routes (messages)
// These are also handled by messages.routes.js but mounted here for logical flow
app.use('/prospects', messagesRoutes);

// Mounting standalone message routes (like delete)
app.use('/messages', messagesRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
