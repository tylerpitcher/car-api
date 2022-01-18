/*
    File handles all routes to /car/*.
*/
const express = require('express');
const db = require('../db/database');
const router = express.Router();

/*
    Middleware function used to ensure a valid key was passed with requests.
    Returns a status of 400 if it is an invalid key, 429 if the user's last request was less
    than a minute ago, or runs the next() function if everything is valid.
*/
async function hasKey(req, res, next) {
    const key = req.body.key;
    if (typeof key != 'string') {
        res.sendStatus(400);
    }else {
        const user = await db.getUserByKey(key);
        if (user == undefined) res.sendStatus(400);
        else if (user.lastRequestTime != 0 && Date.now() - user.lastRequestTime < 6000) res.sendStatus(429); 
        else {
            await db.updateUser(user.id, { lastRequestTime: Date.now() });
            next();
        }
    }
}

/*
    Route returns all cars in the database.
*/
router.get('/', hasKey, async (req, res) => {
    const cars = await db.getCars();
    res.status(200).json({
        success: cars != undefined,
        cars: cars
    });
});

module.exports = router;