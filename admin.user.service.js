const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const AdminUser = require('./admin.user.model');

module.exports = {
    authAdminUser,
    createAdminUser,
    getAllAdminUser,
    getAdminUser
    
}

async function authAdminUser({email, password}){
    const adminUser = await AdminUser.findOne({email});
    if( adminUser && bcrypt.compareSync(password, adminUser.hash)){
        const token = jwt.sign({sub : adminUser.id}, config.secret);
        const { hash, ...userWithoutHash } = adminUser.toObject();
        return { ...userWithoutHash, token };
    }
}
async function getAllAdminUser(){
    return await AdminUser.find();
}

async function getAdminUser(email){
    return await AdminUser.findOne({email : email});
}

async function createAdminUser(userParam){
    console.log(userParam);
    const adminUser = new AdminUser(userParam);

    if(userParam.password){
        adminUser.hash = bcrypt.hashSync(userParam.password, 10);
    }

    await adminUser.save();
}