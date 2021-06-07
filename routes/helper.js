const bcrypt = require("bcrypt");

async function hashPassword(password){
    ///to check if password is strong enough
    var Passwordregex = new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}");
    if (!Passwordregex.test(password))
        throw new Error(
            "your password should contain Atleast 1 capital letter , 1 digit in minimum 8 long"
        );
    ///after all validations are passed return hashed password
    return await bcrypt.hash(password, 10);
}

module.exports = {
    hashPassword
}