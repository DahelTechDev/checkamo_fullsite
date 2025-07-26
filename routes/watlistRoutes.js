const express = require('express');
const router = express.Router();
const waitlistController = require('../controllers/waitListController');

// POST /api/waitlist - Create a new waitlist entry
router.post('/', waitlistController.createWaitlistEntry);

// GET /api/waitlist - Get all waitlist entries (with optional filters)
// Query params: ?wantToBeVerifier=yes&industry=Tech&language=English
router.get('/', waitlistController.getAllWaitlistEntries);

// GET /api/waitlist/stats - Get waitlist statistics
router.get('/stats', waitlistController.getWaitlistStats);

// GET /api/waitlist/:id - Get waitlist entry by ID
router.get('/:id', waitlistController.getWaitlistEntryById);

// GET /api/waitlist/email/:email - Get waitlist entry by email
router.get('/email/:email', waitlistController.getWaitlistEntryByEmail);


module.exports = router;