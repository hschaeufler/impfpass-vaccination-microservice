const UserRepository = require("../repository/UserRepository")
const {UserRole} = require("../model/Enum");



function validateUser(user){
    return user
        && user.mail
        && user.password
        && user.firstName
        && user.lastName
        && user.location
        && ((user.isDoctor  && user.officeName) || !user.isDoctor)
}

function validateCredentials(mail, password){
    return mail && password;
}



async function saveUser(user) {

    if(!validateUser(user)){
        throw "Please check that all required fields of User are set";
    }

    //Assign User-Role
    user.role = user.isDoctor ? UserRole.doctor : UserRole.user;

    const userId = await UserRepository.saveUser(user);

    return userId;

}

async function checkUser(mail, password) {

    if(!validateCredentials(mail, password)){
        throw "Please submit Mail and Password!";
    }

    const authPassed = await UserRepository.checkUser(mail, password);
    return authPassed;

}

async function getUserByMail(mail) {
    const user = await UserRepository.getUserByMail(mail);
    return user;
}



module.exports = {saveUser, checkUser,getUserByMail}