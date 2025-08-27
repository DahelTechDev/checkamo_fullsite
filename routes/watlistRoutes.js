const express = require("express");
const router = express.Router();
const waitlistController = require("../controllers/waitListController");

const authMiddleware = require("../middlewares/admAuth");


// POST /api/waitlist - Create a new waitlist entry
router.post("/auth", waitlistController.admAccess);



// POST /api/waitlist - Create a new waitlist entry
router.post("/", waitlistController.createWaitlistEntry);

// GET /api/waitlist - Get all waitlist entries (with optional filters)
// Query params: ?wantToBeVerifier=yes&industry=Tech&language=English
router.get("/", authMiddleware,  waitlistController.getAllWaitlistEntries);

// GET /api/waitlist/stats - Get waitlist statistics
router.get("/stats", authMiddleware, waitlistController.getWaitlistStats);

// GET /api/waitlist/:id - Get waitlist entry by ID
router.get("/:id", authMiddleware, waitlistController.getWaitlistEntryById);

// GET /api/waitlist/email/:email - Get waitlist entry by email
router.get("/email/:email", authMiddleware, waitlistController.getWaitlistEntryByEmail);

// DELETE /api/waitlist/delete/:email - Get waitlist entry by email
router.delete("/delete/:email", authMiddleware, waitlistController.deleteWaitlistEntry);

module.exports = router;
