import request from 'supertest';
import mongoose from 'mongoose';
import {app} from '../src/app';
import dbObj from '../testing/db/db.test';
beforeEach(dbObj.setupDatabase)

//POST attendance 
test('should create attendance if authorized', async () => {
    await request(app)
       .post('/attendance')
       .set('Authorization', `Bearer ${dbObj.userOne.tokens[0].token}`)
       .send({
            date:'05-08-2024',
            isAbsent:"present",
            rollNumber:dbObj.studentOne.rollNumber
       })
       .expect(201);
});

test('should not create attendance if not authorized', async () => {
    await request(app)
       .post('/attendance')
       .send({
            date:'05-08-2024',
            isAbsent:"present",
            rollNumber:dbObj.studentOne.rollNumber
       })
       .expect(401);
});