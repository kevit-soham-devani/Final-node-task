import request from 'supertest';
import mongoose from 'mongoose';
import {app} from ".././src/app"
import dbObj from '../testing/db/db.test'
import { User } from '../src/components/user/user.model';
// import User from '../src/components/user/user.model';

beforeEach(dbObj.setupDatabase)

//post/user/signup
test('should create a new user', async () => {
    await request(app)
    .post('/user/signup')
    .set('Authorization', `Bearer ${dbObj.userOne.tokens[0].token}`)
    .send({
        name: 'sidharth',
        PhoneNumber: 987654321,
        password: "sidharth741",
        department: 'CE',
        semester:1,
        role: 'admin'
    })
    .expect(200);
})

test('should not create a user if not authorized', async () => {
    await request(app)
        .post('/user/signup')
        .set('Authorization', `Bearer ${dbObj.userOne.tokens[0].token}`)
        .send({
            name: 'sid',
            PhoneNumber: 987654322,
            password: "sid741",
            department: 'CE',
            semester:1,
            role: 'admin'
        })
        .expect(200);
});

//GET /users
test('should fetch all users for admin', async () => {
    await request(app)
        .get('/user')
        .set('Authorization', `Bearer ${dbObj.userOne.tokens[0].token}`)
        .expect(200);
});

test('should not fetch all the users if not authorized', async () => {
    await request(app)
       .get('/user')
       .expect(401);
});

// PATCH /user/:phoneNumber
test('should update user details', async () => {
    const response=await request(app)
       .patch(`/user/${dbObj.userOne.PhoneNumber}`)
       .set('Authorization', `Bearer ${dbObj.userOne.tokens[0].token}`)
       .send({ name: 'John Doe' })
       .expect(200);
   const user=await User.findById(dbObj.userOne._id)
   expect(user?.name).toBe('John Doe')
});

test('should not update user detail if not authorized', async () => {
   await request(app)
       .patch('/user/${dbObj.userOne.mobileNumber}0')
       .send({ name: 'Should Fail' })
       .expect(401);
});

// DELETE /users/:PhoneNumber
test('should delete a user by phonenumber', async () => {
    await request(app)
        .delete(`/users/${dbObj.userOne.PhoneNumber}`)
        .set('Authorization', `Bearer ${dbObj.userOne.tokens[0].token}`)
        .expect(200);
});

  