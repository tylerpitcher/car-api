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

/* 
    Route used to create new cars.
    Returns the new car.
*/
router.post('/new', hasKey, async (req, res) => {
    const keys = Object.keys(req.body);
    if (keys.length != 4) res.sendStatus(400);
    else if (!keys.includes('key')) res.sendStatus(400);
    else if (!keys.includes('make')) res.sendStatus(400); 
    else if (!keys.includes('model')) res.sendStatus(400);
    else if (!keys.includes('year')) res.sendStatus(400);
    else {
        const car = await db.createCar(req.body.make, req.body.model, req.body.year);
        res.status(200).json({ success: car != undefined, car: car });
    }
});

/*
    Route used to delete existing cars from the database.
*/
router.delete('/delete', hasKey, async (req, res) => {
    if (!Number.isInteger(req.body.id)) res.sendStatus(400);
    else {
        const result = await db.deleteCar(req.body.id);
        res.status(200).json({ success: result == 1 });
    }
});

/*
    Route used to update existing cars in the database.
    Returns 400 if an id is not passed otherwise
    it returns the updated car.
*/
router.put('/update', hasKey, async (req, res) => {
    if (!Object.keys(req.body).includes('id')) res.sendStatus(400);
    else {
        let obj = {}, body = req.body;
        if (body.make) obj.make = body.make;
        if (body.model) obj.model = body.model;
        if (body.year && Number.isInteger(body.year)) obj.year = body.year;
        let car = await db.updateCar(req.body.id, obj);
        res.status(200).json({ success: car != undefined, car: car });
    }
});

module.exports = router;