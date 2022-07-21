import jwt from 'jsonwebtoken'
import secrets from '../utils/secrets.js'

const genToken = (id) => {
  return jwt.sign({ id }, secrets.JWT_SECRET, {
    expiresIn: '30d',
  })
}

export default genToken