const userService = require('../service/user-service');
const UserService = require('../service/user-service');

class UserController {
    async signup(req,res,next) {
        try {
            const {username, email, password} = req.body;
            const userData = await UserService.signup(username, email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (error) {
            console.log(error);
        }
    }
    async signin(req,res,next) {
        try {
            const {email, password} = req.body;
            const userData = await UserService.signin(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (error) {
            console.log(error);
        }
    }
    async logout(req,res,next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (error) {
            console.log(error);
        }
    }
    async refresh(req,res,next) {
        try {
            
        } catch (error) {
            
        }
    }
    async activate(req,res,next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (error) {
            console.log(error);
        }
    }
    async getUsers(req,res,next) {
        try {
            res.json(['123','444']);
        } catch (error) {
            
        }
    }
}

module.exports = new UserController();