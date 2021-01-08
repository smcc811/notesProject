const router = require('express').Router();
const path = require('path');

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"))
})

// * means any route not defined will redirect to the index (home) page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

module.exports = router;