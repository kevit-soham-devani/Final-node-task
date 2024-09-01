import { Schema, model, Document } from 'mongoose';
import { Department } from '../../components/user/user.enum';
import batchRoutes from './batch.routes';

interface Branch {
    name: string;
    totalStudentsIntake: number;
    currentSeatCount: number
}

interface IBatch extends Document {
    year: number;
    branches: Branch[];
    totalEnrolledStudents: number;
}

const branchSchema = new Schema<Branch>({
	name: {
		type: String,
		required: true,
		enum: Department,
	},
	totalStudentsIntake: {
		type: Number,
		required: true,
	},
    currentSeatCount: {
		type: Number,
		required: true,
		default: 0,
	},
});

const batchSchema = new Schema<IBatch>({
    year: {
        type: Number,
        required: true 
    },
    branches: [branchSchema],
    totalEnrolledStudents: {
		// New field
		type: Number,
		required: true,
		default: 0,
	},
});
/**
 * Pre-Hook to Calculate total enrolled students based on currentSeatCount
 */
batchSchema.pre<IBatch>('save', function (next) {
	// eslint-disable-next-line arrow-body-style
	const totalEnrolled = this.branches.reduce((total, branch) => {
		return total + branch.currentSeatCount;
	}, 0);

	this.totalEnrolledStudents = totalEnrolled;
	next();
});

const Batch = model<IBatch>('Batches', batchSchema);
export default Batch;
