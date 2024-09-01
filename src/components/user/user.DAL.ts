import HttpException from "../../utils/error.utils";
import USER_ERROR_CODES from "./user.error";
import {User} from "./user.model"


/**
 * Create new User in DB
 * @param userBody => USER OBJECT TO BE CREATED
 */

export async function createNewUser(userBody = typeof User.schema.obj) {
  try {
    return await User.create(userBody);
  } catch (err) {
    throw new HttpException(
      500,
      USER_ERROR_CODES.CREATE_USER_UNHANDLED_IN_DB,
      "CREATE_USER_HANDLED_IN_DB",
      err
    );
  }
}

/**
 * Get user by Detail
 */

export async function GetUserByDetail(userObj: any) {
  try{
    const user = await User.find({ ...userObj })
    return user
  } catch (e) {
    return e
  }
}



/**
 * 
 * Delete new User in DB 
 */

export async function deleteUser(userPhoneNumber) {
  try {
    const deleteUser = await User.findOneAndDelete(userPhoneNumber)
    return deleteUser
  } catch (err) {
    throw new HttpException(
      500,
      USER_ERROR_CODES.CREATE_USER_UNHANDLED_IN_DB,
      "CREATE_USER_HANDLED_IN_DB",
      err
    );
  }
}


/**
 * Find User By ID
 * @param id = User Object to be found
 */

export async function findUserById(id) {
  try{
    return await User.findOne({id})
  } catch (err) {
    throw new HttpException(
      500,
      USER_ERROR_CODES.CREATE_USER_UNHANDLED_IN_DB,
      "CREATE_USER_HANDLED_IN_DB",
      err
    )
  }
}

/**
 * List users from DB
 */

export async function findUser() {
    try{
      return await User.find().lean();
    } catch (err) {
      throw new HttpException(
        500,
        USER_ERROR_CODES.USER_NOT_FOUND,
        'USERS_NOT_FOUND',
        err,
      );

    }
}

export async function updateuserDetails(
	phoneNumber: string,
	updateDetails: any,
) {
	try {
		const updateUser = await User.findOneAndUpdate(
			{ PhoneNumber:phoneNumber },
			{ $set: updateDetails },
			{ new: true, runValidators: true },
		);
		return updateUser;
	} catch (e) {
		return e;
	}
}

