const express = require('express');
const db = require('../db/database');
const router = express.Router();

router.post('/register', async (req, res) => {
    const user = await db.createUser();
    res.status(200).json({
        success: user.key != undefined,
        key: user.key
    });
});

router.get('/get/:key', async (req, res) => {
    let user = await db.getUserByKey(req.params.key);
    res.status(200).json({ 
        success: user != undefined, 
        user: user 
    });
});

router.delete('/delete', async (req, res) => {
    let result = await db.deleteUser(req.body.key);
    res.status(200).json({ success: result == 1 });
});

module.exports = router;