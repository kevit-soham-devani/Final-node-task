/* eslint-disable consistent-return */
/**
 * verify admin */
import { User_Role } from "components/user/user.enum";
/**
 * Function for verifying admin
 */

const checkAdmin = async (req, res, next) => {
	try {
		const { role } = req.user;
		if (role !== User_Role.Admin) {
			return res.status(401).send({ message: 'Not authorized' });
		}
		next();
	} catch (e) {
		res.status(401).send({ message: 'Please authorize', e });
	}
};

export default checkAdmin;