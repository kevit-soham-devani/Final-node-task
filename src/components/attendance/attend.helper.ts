import Attendance from "./attend.model";
import moment from 'moment'
import { ISABSENT } from "./attendence.enum";

/**
 * @description Helper to find low attendance
 * @return {*}
 * 100 - (100 * absentDays / totalDays)
 */
export const getLowAttendance = async (queryParams: any): Promise<any> => {
	const { startDate, endDate } = queryParams;

	// Validate and format the dates
	const formattedStartDate = moment(startDate, 'DD-MM-YYYY')
		.startOf('day')
		.toDate();
	const formattedEndDate = moment(endDate, 'DD-MM-YYYY')
		.endOf('day')
		.toDate();
	const query: any = {
		date: { $gte: formattedStartDate, $lte: formattedEndDate },
	};
	return await Attendance.aggregate([
		{ $match: query },
		{
			$group: {
				_id: '$rollNumber',
				totalDays: { $sum: 1 },
				absentDays: {
					$sum: {
						$cond: [{ $eq: ['$isAbsent', ISABSENT.ABSENT] }, 1, 0],
					},
				},
			},
		},
		{
			$addFields: {
				attendancePercentage: {
					$subtract: [
						100,
						{
							$divide: [
								{
									$multiply: [100, '$absentDays'],
								},
								'$totalDays',
							],
						},
					],
				},
			},
		},
		{
			$match: {
				attendancePercentage: { $lt: 75 },
			},
		},
		{
			$lookup: {
				from: 'students',
				localField: '_id',
				foreignField: 'rollNumber',
				as: 'studentDetails',
			},
		},
		{
			$unwind: '$studentDetails',
		},
		{
			$project: {
				_id: 0,
				attendancePercentage: 1,
				studentDetails: 1,
			},
		},
	]);
};
