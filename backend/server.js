import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // Import CORS
import authRoutes from './routes/auth.js'; // Note the .js extension in ES modules
import validationRoutes from './routes/validation.js';
import plannerValidationRoutes from './routes/plannerValidation.js';
import userRoutes from './routes/auth.js';  // Import your existing user routes
import adminRoutes from './routes/admin.js';  // Import the newly created admin routes
import memoRoutes from './routes/memo.js';
import paymentRoutes from './routes/payment.js';

const app = express();

app.use(cors());  // This will allow requests from all origins

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://harshgujjar2120:mp09DH8764@cluster0.9nyuyri.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/validation', validationRoutes);
app.use('/api/planner', plannerValidationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/memo', memoRoutes);
app.use('/api/payment', paymentRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
