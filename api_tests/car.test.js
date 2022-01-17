const request = require('supertest');
const db = require('../api/db/database');
const app = require('../api/server');

const car = expect.objectContaining({
    id: expect.any(Number),
    make: expect.any(String),
    model: expect.any(String),
    year: expect.any(Number)
})

describe('Test car routes', () => {
    describe('GET /car/', () => {
        it('200 Response', async () => {
            let key = (await db.createUser()).key;
            await request(app).get('/car/').send({ key: key }).expect(200).then(res => {
                expect(res.body).toEqual(expect.objectContaining({
                    success: true,
                    cars: expect.any(Array)
                }));
            });
        });

        it('400 Response', async () => {
            await request(app).get('/car/').expect(400);
        });

        it('429 Response', async () => {
            let key = (await db.createUser()).key;
            await request(app).get('/car/').send({ key: key }).expect(200);
            await request(app).get('/car/').send({ key: key }).expect(429);
        });
    });

    describe('POST /car/new', () => {
        it('200 Response', async () => {
            let key = (await db.createUser()).key;
            await request(app).post('/car/new').send({ 
                key: key,
                make: 'henry',
                model: 'h100',
                year: 1948,
            }).expect(200).then(res => {
                expect(res.body).toEqual(expect.objectContaining({
                    success: true,
                    car: car
                }));
            });
        });

        it('400 Response', async () => {
            let key = (await db.createUser()).key;
            await request(app).post('/car/new').send({ key: key }).expect(400);
        });
    });

    describe('PUT /car/update', () => {
        it('200 Response', async() => {
            let key = (await db.createUser()).key;
            let id = (await db.createCar('henry', 'h100', 1948)).id;
            await request(app).put('/car/update').send({
                key: key,
                id: id,
                make: 'ford',
                model: 'f100',
                year: 1949
            }).expect(200).then(res => {
                expect(res.body).toEqual(expect.objectContaining({
                    success: true,
                    car: car
                }));
            });
        });

        it('400 Response', async () => {
            let key = (await db.createUser()).key;
            await request(app).put('/car/update').send({ key: key }).expect(400);
        });
    });

    describe('DELETE /car/delete', () => {
        it('200 response', async () => {
            let key = (await db.createUser()).key;
            let id = (await db.createCar('henry', 'konik', 1964)).id;
            await request(app).delete('/car/delete').send({
                key: key,
                id: id
            }).expect(200).then(res => {
                expect(res.body).toEqual({ success: true });
            });
        });

        it('400 Response', async() => {
            let key = (await db.createUser()).key;
            await request(app).delete('/car/delete').send({ key: key }).expect(400);
        });
    });

    afterAll(() => {
        db.knex.destroy();
    });
});