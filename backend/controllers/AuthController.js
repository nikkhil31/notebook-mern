import asyncHandler from 'express-async-handler'
import { body, validationResult } from 'express-validator'
import User from '../models/userModel.js'
import genToken from '../helper/genToken.js'
import * as apiResponse from '../helper/apiResponse.js'
import { checkEmailDuplication } from '../helper/checkDuplication.js'
import handleValidation from '../middleware/handleValidation.js'

/**
 * User login.
 *
 * @param {string}      firstName
 * @param {string}      lastName
 * @param {string}      email
 * @param {string}      password
 *
 * @returns {Object}
 */

export const register = [
  body('firstName').not().isEmpty().trim().isAlphanumeric(),

  body('lastName').not().isEmpty().trim().isAlphanumeric(),

  body('email').isEmail().normalizeEmail().custom(checkEmailDuplication),

  body('password').isLength({ min: 5 }),
  handleValidation,
  asyncHandler(async (req, res) => {
    // return res.json(req.body)

    const user = await User.create(req.body)

    if (user) {
      const newUser = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        access_token: genToken(user._id),
      }

      return apiResponse.successResponseWithData(res, 'success', newUser)
    } else {
      return apiResponse.ErrorResponse(res, 'Invalid user data')
    }
  }),
]

/**
 * User login.
 *
 * @param {string}      email
 * @param {string}      password
 *
 * @returns {Object}
 */

export const login = [
  body('email')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Email is Required.')
    .isEmail()
    .withMessage('Email must be a valid email address.'),
  body('password')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Password is Required.'),
  handleValidation,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email, status: true })

    if (user && (await user.matchPassword(password))) {
      const newUser = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        access_token: genToken(user._id),
      }

      return apiResponse.successResponseWithData(res, 'success', newUser)
    } else {
      return apiResponse.unauthorizedResponse(res, 'Invalid Email or Password')
    }
  }),
]
