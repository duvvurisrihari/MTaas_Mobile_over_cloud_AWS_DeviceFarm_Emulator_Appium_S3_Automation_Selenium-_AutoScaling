`use strict`

import passwordHash from 'password-hash'

var EncryptPassword = (password) => {
    return passwordHash.generate(password);
}

var validatePassword = (password, hashedPassword) => {
    if (passwordHash.verify(password, hashedPassword)){
        return true;
    }
    return false;
}

module.exports = {
    EncryptPassword: EncryptPassword,
    validatePassword: validatePassword
}