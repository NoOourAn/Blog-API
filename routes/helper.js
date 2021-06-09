const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function hashPassword(password) {
    ///to check if password is strong enough
    var Passwordregex = new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}");
    if (!Passwordregex.test(password))
        throw new Error(
            "your password should contain Atleast 1 capital letter , 1 digit in minimum 8 long"
        );
    ///after all validations are passed return hashed password
    return await bcrypt.hash(password, 10);
}

async function prepareToken(id) {
    //prepare token for user
    return await jwt.sign({ id }, process.env.TOKEN_SECRETKEY);
}

module.exports = {
    hashPassword,
    prepareToken
}