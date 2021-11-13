const router = require('express').Router();

// Import modular routers for /notes
const noteRoutes = require("./notes");

router.use("/notes", noteRoutes);

module.exports = router;
