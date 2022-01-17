const knex = require('./knex');
const hashIds = require('hashids');

const hash = new hashIds(salt='salty', min_length=15);

async function createUser() {
    let id = (await knex('users').insert({}))[0];
    return updateUser(id, { 
        key: 'U' + hash.encode(id),
        lastRequestTime: 0
    });
}

async function updateUser(id, user) {
    await knex('users').where('id', id).update(user);
    return getUserById(id);
}

function getUsers() {
    return knex('users').select('*');
}

function getUserByKey(key) {
    return knex('users').where({ key: key }).first();
}

function getUserById(id) {
    return knex('users').where({ id: id }).first();
}

function deleteUser(key) {
    return knex('users').where({ key: key }).del();
}

async function createCar(make, model, year) {
    if (!Number.isInteger(year)) return undefined;
    if (typeof make != 'string' || typeof model != 'string') return undefined;
    const id = (await knex('cars').insert({ make: make, model: model, year: year }))[0];
    return getCarById(id);
}

async function updateCar(id, car) {
    await knex('cars').where({ id: id }).update(car);
    return getCarById(id);
}

function getCars() {
    return knex('cars').select('*');
}

function getCarById(id) {
    return knex('cars').where({ id: id }).first();
}

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