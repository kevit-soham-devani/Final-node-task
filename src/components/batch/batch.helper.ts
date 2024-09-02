import Batch from "./batch.model";
import { User_Role } from "../user/user.enum";

/**
 * Helper to get Vacants Seats
 * @param year
 * @returns
 */
export const getVacantSeatsByYear = async (year: number) => {
	const vacantSeats = await Batch.aggregate([
		{
			$match: {
				year,
			},
		},
		{
			$project: {
				_id: 0,
				batch: '$year',
				totalStudents: '$totalEnrolledStudents',
				totalStudentsIntake: {
					$sum: '$branches.totalStudentsIntake',
				},
				availableIntake: {
					$subtract: [
						{
							$sum: '$branches.totalStudentsIntake',
						},
						{
							$sum: '$branches.currentSeatCount',
						},
					],
				},
				branches: {
					$map: {
						input: '$branches',
						as: 'branch',
						in: {
							k: '$$branch.name',
							v: {
								totalStudents: '$$branch.currentSeatCount',
								totalStudentsIntake:
									'$$branch.totalStudentsIntake',
								availableIntake: {
									$subtract: [
										'$$branch.totalStudentsIntake',
										'$$branch.currentSeatCount',
									],
								},
							},
						},
					},
				},
			},
		},
		{
			$project: {
				batch: 1,
				totalStudents: 1,
				totalStudentsIntake: 1,
				availableIntake: 1,
				branch: {
					$arrayToObject: '$branches',
				},
			},
		},
	]);

	return vacantSeats;
};

/**
 * Helper to authorize role
 * @param role
 * @returns
 */
export function checkAdmin(role) {
	
	return role !== User_Role.Admin;
}