import request from 'supertest';
import mongoose from "mongoose";
import dbObj from "../testing/db/db.test";
import { app } from "../src/app";
import Batch from "../src/components/batch/batch.model";

beforeEach(dbObj.setupDatabase)

//POST /batch
test('should create a Batch with valid data', async () => {
    const response=await request(app)
       .post('/batch')
       .set('Authorization', `Bearer ${dbObj.userOne.tokens[0].token}`)
       .send({
        year:2020,
        branches:[{
            name:"CE",
            totalStudentsIntake:2,
        }],
       })
       .expect(201);
    const batch=await Batch.findById(response.body.data._id)
    expect(batch).not.toBeNull()
});
 
test('should not create a Batch if not authorize', async () => {
    await request(app)
       .post('/batch')
       .send({
        year:2022,
        branches:[{
            name:"CE",
            totalStudentsIntake:2,
        }],
       })
       .expect(401);
});

//Get /batch
test('should fetch all batches', async () => {
    const response= await request(app)
         .get('/batch')
         .set('Authorization', `Bearer ${dbObj.userOne.tokens[0].token}`)
         .expect(200);
     const batch=await Batch.find(response.body.data._id)
     expect(batch).not.toBeNull()
 });
 

test('should not fetch all batches if not authorized', async () => {
    await request(app)
     .get('/batch')
     .expect(401);
})

//Delete /batch/:year
test('should delete batch if authorized', async () => {
    await request(app)
     .delete('/batch/2020')
     .set('Authorization', `Bearer ${dbObj.userOne.tokens[0].token}`)
     .expect(200);
});

//PATCH /batch
test('should update batch details', async () => {
    const response=await request(app)
       .patch(`/batch`)
       .set('Authorization', `Bearer ${dbObj.userOne.tokens[0].token}`)
       .send({ branchName: 'CE', totalStudentsIntake:1000})
       .expect(200);
   const batch=await Batch.findById(response.body.data._id)
   expect(batch?.branches[0].totalStudentsIntake).toBe(1000)
});