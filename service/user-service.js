const userModel = require("../models").User;
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const email_service = require("./email-service");
const token_service = require("./token-service");
const userDto = require("../dtos/user-dto");
const { where } = require("sequelize");

class UserService {
    async signup(username, email, password){
        const candidate = await userModel.findOne({where: {email}});
        if(candidate){
            return {success: false}
        }else {
            const passHash = await bcrypt.hash(password, 3);
            const activationLink = uuid.v4();
            const user = await userModel.create({username, email, password: passHash, activationLink});
            await email_service.sendactivation(email, `${process.env.API_URL}/api/activate/${activationLink}`);
            const UserDto = new userDto(user);
            const tokens = token_service.generateToken({...UserDto});
            await token_service.saveToken(UserDto.id, tokens.refreshToken);
            
            return {...tokens,user: UserDto, success: true}
        }
    }

    async activate(activationLink){
        const user = await userModel.findOne({where: {activationLink}});
        if(!user){
            return {success: false};
        }else {
            user.activated = true;
            await user.save();
        }
    }

    async signin(email, password){
        const con = await userModel.findOne({where: {email}});
        if(con){
            const isPass = bcrypt.compare(password, con.password);
            if(isPass){
                const UserDto = new userDto(con);
                const tokens = token_service.generateToken({...UserDto});
                await token_service.saveToken(UserDto.id, tokens.refreshToken);
                
                return {...tokens,user: UserDto, success: true}
            }else {
                return {success: false};
            }
        }else {
            return {success: false};    
        }
    }

    async logout(refreshToken){
        const token = await token_service.removeToken(refreshToken);
        return token;
    }
}

module.exports = new UserService();