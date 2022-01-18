/*
    File handles all routes to /user/*.
*/
const express = require('express');
const db = require('../db/database');
const router = express.Router();

/*
    Route used to register new keys.
    Returns the new key.
*/
router.post('/register', async (req, res) => {
    const user = await db.createUser();
    res.status(200).json({
        success: user.key != undefined,
        key: user.key
    });
});

/*
    Route used to delete user with the passed key.
*/
router.delete('/delete', async (req, res) => {
    let result = await db.deleteUser(req.body.key);
    res.status(200).json({ success: result == 1 });
});

module.exports = router;