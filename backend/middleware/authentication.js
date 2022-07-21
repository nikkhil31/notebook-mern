import jwt from 'jsonwebtoken'
import * as apiResponse from '../helper/apiResponse.js'
import decodeToken from '../helper/decodeToken.js'
import User from '../models/userModel.js'

export const loginRequired = async (req, res, next) => {

    if (!req.headers.authorization && !req.headers.authorization?.startsWith('Bearer')) {
        return apiResponse.unauthorizedResponse(res, 'Please make sure your request has an Authorization header.')
    }

    try {
        let decoded = decodeToken(req)

        req.user = await User.findById(decoded.id).select('-password')

        next()


    } catch (error) {

        return apiResponse.unauthorizedResponse(res, error.message)

    }
}