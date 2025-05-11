const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
require('./models/dbConnect');
const authRoutes = require('./routes/authRoutes');
const hiveRoutes = require('./routes/hiveRoutes');
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());  // Middleware to parse incoming JSON requests
app.use('/auth/', authRoutes);
app.use('/hive', hiveRoutes);

// Handling undefined routes (with standard Error)
app.all('*', (req, res, next) => {
    next(new Error(`Can't find ${req.originalUrl} on the server`));
});

// Error handling middleware
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
