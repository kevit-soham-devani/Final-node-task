import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../src/app';
import dbObj from './db/db.test';
import Student from '../src/components/students/student.model';

beforeEach(dbObj.setupDatabase)

//POST /student
test('should create a Student  if authorized', async () => {
    await request(app)
       .post('/student')
       .set('Authorization', `Bearer ${dbObj.userOne.tokens[0].token}`)
       .send({
        name: 'second student',
        mobileNumber:123456789,
        rollNumber:"21ce057",
        role: 'student',
        department:"CE",
        batch:2020,
        semester:7
       })
       .expect(201);
});

test('should not create a Student  if not  authorized', async () => {
    await request(app)
        .post('/student')
        .send({
         name: 'second student',
         mobileNumber:123456789,
         rollNumber:"21ce057",
         role: 'student',
         department:"CE",
         batch:2020,
         semester:7
        })
        .expect(401);
 });

 //GET /users
test('should fetch all students if authorized', async () => {
    await request(app)
        .get('/student')
        .set('Authorization', `Bearer ${dbObj.userOne.tokens[0].token}`)
        .expect(200);
});

test('should not fetch all students if not  authorized', async () => {
    await request(app)
        .get('/student')
        .expect(401);
});

//GET /student/analytics
test('should fetch students analytics if authorized', async () => {
    await request(app)
        .get('/analytics/students')
        .set('Authorization', `Bearer ${dbObj.userOne.tokens[0].token}`)
        .expect(200);
});
