import express from 'express';
import adminDashboardController from '../controllers/adminDashboardController.js';

const router = express.Router();

router.get('/dashboard', adminDashboardController.getDashboardData);

export default router;
