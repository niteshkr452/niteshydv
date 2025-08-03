const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');

// Import routes
const apiRoutes = require('./routes/api');
const { router: authRoutes } = require('./routes/auth');
const adminRoutes = require('./routes/admin');

// Load environment variables
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev')); // Logging middleware

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, './')));

// MongoDB connection with better error handling
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000 // 5 second timeout
})
.then(() => console.log('✅ MongoDB Connected Successfully'))
.catch(err => {
    console.error('❌ MongoDB Connection Error:', err);
    console.log('Continuing without database...');
});

// Handle MongoDB connection events
mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected, attempting to reconnect...');
});

mongoose.connection.on('reconnected', () => {
    console.log('MongoDB reconnected successfully');
});

// Mount routes
app.use('/api', apiRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Serve index.html for all other routes (SPA support)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Create initial admin user if none exists
const User = require('./models/User');
const createAdminUser = async () => {
    try {
        const adminExists = await User.findOne({ role: 'admin' });
        
        if (!adminExists) {
            await User.create({
                name: process.env.ADMIN_EMAIL?.split('@')[0] || 'Admin User',
                email: process.env.ADMIN_EMAIL || 'admin@example.com',
                password: process.env.ADMIN_PASSWORD || 'admin123_change_this',
                role: 'admin'
            });
            console.log('✅ Admin user created successfully');
        }
    } catch (err) {
        console.error('Error creating admin user:', err);
    }
};

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({
        success: false,
        message: 'Server error',
        error: process.env.NODE_ENV === 'production' ? null : err.message
    });
});

// Start server
const startServer = async () => {
    try {
        // Try to connect to MongoDB but don't wait for it
        mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000 // 5 second timeout
        })
        .then(() => {
            console.log('✅ MongoDB Connected Successfully');
            // Create admin user if needed
            createAdminUser();
        })
        .catch(err => {
            console.error('❌ MongoDB Connection Error:', err);
            console.log('Continuing without database...');
        });
        
        // Start server regardless of MongoDB connection
        const PORT = process.env.PORT || 8080; // Changed to port 8080
        app.listen(PORT, () => {
            console.log(`✅ Server is running on port ${PORT}`);
            console.log(`📁 Static files are being served from: ${path.join(__dirname, './')}`);
            console.log(`🌐 Visit http://localhost:${PORT} in your browser`);
        });
    } catch (err) {
        console.error('❌ Server startup error:', err);
    }
};

// Run the server
startServer();
