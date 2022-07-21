import jwt from 'jsonwebtoken'
import secrets from '../utils/secrets.js'

const decodeToken = (req) => {
    let token = req.headers.authorization.split(' ')[1]

    const decoded = jwt.verify(token, secrets.JWT_SECRET)
    return decoded
}

export default decodeToken