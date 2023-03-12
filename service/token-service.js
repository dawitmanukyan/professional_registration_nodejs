const jwt = require('jsonwebtoken');
const tokenModel = require('../models').Token;
const userModel = require('../models').User;

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_SECRET_REFRESH, {expiresIn: '30d'});
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken){
        const tokenData = await tokenModel.findOne({where: {user: userId}});
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await tokenModel.create({user: userId, refreshToken});
        return token;
    }

    async removeToken(refreshToken){
        if(refreshToken != undefined){
            const delToken = await tokenModel.destroy({where: {refreshToken}});
            return delToken;
        }else {
            return {success: false};
        }
    }
}

module.exports = new TokenService();