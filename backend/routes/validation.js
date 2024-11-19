import express from 'express';

const router = express.Router();

// POST request to check membership status
router.post('/check', (req, res) => {
  const { plannerId } = req.body;

  // Mocked validation check logic
  if (plannerId === "12345") {
    return res.status(200).json({ status: "valid" });
  } else if (plannerId === "67890") {
    return res.status(200).json({ status: "expired" });
  } else {
    return res.status(200).json({ status: "invalid" });
  }
});

export default router;
