import mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import {User} from "../../src/components/user/user.model"
import * as dotenv from 'dotenv';
import Batch from '../../src/components/batch/batch.model';
import Student from '../../src/components/students/student.model';
import Attendance from '../../src/components/attendance/attend.model';
 
dotenv.config();
 
const MONGODB_TEST_URL = process.env.MONGODB_TEST_URL!;
const JWT_SECRET = process.env.JWT_SECRET!;
// Define sample user data for testing
const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'random@2024',
    PhoneNumber: 1234567890,
    semester:1,
    role: 'admin',
    tokens: [{ token: jwt.sign({ _id: userOneId }, JWT_SECRET, { expiresIn: '7d' }) }]
};

const batchOneId = new mongoose.Types.ObjectId();
const branchOneId = new mongoose.Types.ObjectId();
const batchOne = {
  _id: batchOneId,
  year: 2020,
  branches: [
    {
      name: "CE",
      totalStudentsIntake: 2,
      _id: branchOneId,
      currentSeatCount: 0,
    },
  ],
  totalEnrolledStudents: 0,
};

const studentOneId = new mongoose.Types.ObjectId();
const studentOne= {
    _id: studentOneId,
    name: 'first student',
    mobileNumber: '0000000000',
    rollNumber:"21ce056",
    role: 'student',
    department:"CE",
    batch:2020,
    semester:7
};

const attendanceOneId= new mongoose.Types.ObjectId();
const attendanceOne= {
    _id: attendanceOneId,
    rollNumber:"21ce056",
    isAbsent:"absent",
    date:"2024-08-03T18:30:00.000Z"
};

const setupDatabase = async () => {
    await mongoose.createConnection(MONGODB_TEST_URL);
    await mongoose.connection.db?.dropDatabase();
    // Insert test users
    await new User(userOne).save(),
    await new Batch(batchOne).save(),
    await new Student(studentOne).save(),
    await new Attendance(attendanceOne).save()
}
   
export default {
    setupDatabase,
    userOne,
    batchOne,
    studentOne
};
 
afterAll(async () => {
    await mongoose.disconnect();
});