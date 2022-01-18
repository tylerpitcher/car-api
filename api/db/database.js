/*
    This file handles all database requests.
*/
const knex = require('./knex');
const hashIds = require('hashids');

// Replace salt before running in real world.
const hash = new hashIds(salt='8a5da52ed126447d359e70c05721a8aa', min_length=15);

/*
    Creates a new user key in database.
    Returns the new user.
*/
async function createUser() {
    let id = (await knex('users').insert({}))[0];
    return updateUser(id, { 
        key: 'U' + hash.encode(id),
        lastRequestTime: 0
    });
}


/*
    Updates the user with the passed id. Uses user object to update the existing user.
    Returns the user object.
*/
async function updateUser(id, user) {
    await knex('users').where('id', id).update(user);
    return getUserById(id);
}

/*
    Gets all users from the database.
    Returns an array of all users.
*/
function getUsers() {
    return knex('users').select('*');
}

/*
    Gets the user with the key passed.
    Returns the user.
*/
function getUserByKey(key) {
    return knex('users').where({ key: key }).first();
}

/*
    Gets the user with the id passed.
    Returns the user.
*/
function getUserById(id) {
    return knex('users').where({ id: id }).first();
}

/*
    Deletes the user with the given key.
    Returns 1 if successful deleted otherwise 0.
*/
function deleteUser(key) {
    return knex('users').where({ key: key }).del();
}

/*
    Creates a new car in db with the given make, model, & year.
    Returns the new car.
*/
async function createCar(make, model, year) {
    if (!Number.isInteger(year)) return undefined;
    if (typeof make != 'string' || typeof model != 'string') return undefined;
    const id = (await knex('cars').insert({ make: make, model: model, year: year }))[0];
    return getCarById(id);
}

/*
    Updates the car in the database with the new car object.
    Returns the updated car.
*/
async function updateCar(id, car) {
    await knex('cars').where({ id: id }).update(car);
    return getCarById(id);
}

/*
    Gets all cars in the database.
    Returns an array of all cars.
*/
function getCars() {
    return knex('cars').select('*');
}

/*
    Gets the car with the given id.
    Returns the car.
*/
function getCarById(id) {
    return knex('cars').where({ id: id }).first();
}

/*
    Deletes the car with the given id.
    Returns 1 if successful otherwise 0.
*/
function deleteCar(id) {
    return knex('cars').where({ id: id }).del();
}

module.exports = {
    knex,
    createUser,
    updateUser,
    getUsers,
    getUserByKey,
    getUserById,
    deleteUser,
    createCar,
    updateCar,
    getCars,
    getCarById,
    deleteCar
}