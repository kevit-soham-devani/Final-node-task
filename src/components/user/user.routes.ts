import { Router } from "express";
import userController from "./user.controller";
import auth from "../../utils/auth";
import role from "../../utils/verifyrole";
class UserRouter {
    public router: Router;

    userController = new userController();

    constructor () {
        this.router = Router();
        this.initializeRoutes()
    }

    initializeRoutes () {

        //signup
        this.router.post('/user/signup', auth, this.userController.createUser)

        //loginUser
        this.router.post('/users/login', this.userController.logInUser)

        //UpdateUser
        this.router.patch('/user/:phoneNumber',auth,this.userController.updateUser)

        //deleteuser
        this.router.delete('/users/:phoneNumber',auth, this.userController.deleteUser)

        //getListUser
        this.router.get('/user',auth, this.userController.getUsers)

        //logOutUser
        this.router.delete('/user/logout',auth, this.userController.logOutUser)
    }
}

export default new UserRouter().router