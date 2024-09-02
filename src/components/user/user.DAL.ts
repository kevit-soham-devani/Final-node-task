import {User} from "./user.model"


/**
 * Create new User in DB
 * @param userBody => USER OBJECT TO BE CREATED
 */

export async function createNewUser(userBody = typeof User.schema.obj) {
  try {
    return await User.create(userBody);
  } catch (err) {
    return err
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
    return err
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
    return err
  }
}

/**
 * List users from DB
 */

export async function findUser() {
    try{
      return await User.find().lean();
    } catch (err) {
      return err
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

