/*
    File tests all API points for the user route.
*/
const request = require('supertest');
const db = require('../api/db/database');
const app = require('../api/server');

describe('Test user routes', () => {
    describe('POST /user/register', () => {
        it('200 Response', async () => {
            await request(app).post('/user/register').expect(200).then(res => {
                expect(res.body).toEqual(expect.objectContaining({
                    success: true,
                    key: expect.any(String)
                }));
            });
        });
    });

    describe('DELETE /user/delete', () => {
        it('Valid Response', async () => {
            let key = (await db.createUser()).key;  
            await request(app).delete('/user/delete').send({ key: key }).expect(200).then(res => {
                expect(res.body).toEqual({ success: true })
            });
        })
    
        it('Invalid Response', async () => {
            await request(app).delete('/user/delete').send({ key: '123' }).expect(200).then(res => {
               expect(res.body).toEqual({ success: false })
           });
        });
    });

    afterAll(() => {
        db.knex.destroy();
    });
});