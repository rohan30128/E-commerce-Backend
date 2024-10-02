const bcrypt = require('bcryptjs');

const hashPassword = async (password)=>{
    try {
        const salt = 10;
        const hashpsd = await bcrypt.hash(password,salt);
        return hashpsd
    } catch (error) {
        console.log(error);
    }
}

const comparePassword = async (password,hashpsd)=>{
    return bcrypt.compare(password,hashpsd)
}

module.exports = {
    hashPassword,
    comparePassword
}