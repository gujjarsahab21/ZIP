import express from 'express';
import { createMemo, getAllMemos } from '../controllers/memoController.js'; // Correctly import the function
const router = express.Router();

// POST request to create a new memo
router.post('/create', createMemo);

router.get("/", getAllMemos);

export default router;
