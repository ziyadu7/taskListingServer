import bcrypt from 'bcrypt'
require('dotenv').config()

export default function hashPassword(password: String) {
    bcrypt
        .hash(password, process.env.saltRounds)
        .then(hash => {
            console.log('Hash ', hash)
            return hash
        })
        .catch(err => console.error(err.message))
}