import asyncHandler from 'express-async-handler'
import { body, validationResult } from 'express-validator'
import * as apiResponse from '../helper/apiResponse.js'
import handleValidation from '../middleware/handleValidation.js'
import Category from '../models/categoryModel.js'

export const getCategory = asyncHandler(async (req, res) => {
  const id = req.query.category

  const finedCategory = id
    ? await Category.findById(id).select('-createdAt -updatedAt -__v')
    : await Category.find({}).select('-createdAt -updatedAt -__v')

  return apiResponse.successResponseWithData(res, 'success', finedCategory)
})

export const addCategory = [
  body('title').not().isEmpty().trim().isAlphanumeric(),
  handleValidation,
  asyncHandler(async (req, res) => {
    let category = new Category(req.body)
    category = await category.save()

    return apiResponse.successResponseWithData(res, 'success', {
      _id: category._id,
      title: category.title,
    })
  }),
]

export const updateCategory = [
  body('title').optional().trim().isAlphanumeric(),
  body('category').optional().trim().isAlphanumeric(),
  handleValidation,
  asyncHandler(async (req, res) => {
    const category = await Category.findById(req.body.category)

    if (category) {
      req.body.title && (category.title = req.body.title)

      let updatedCategory = await category.save()

      return apiResponse.successResponseWithData(res, 'success', {
        _id: updatedCategory._id,
        title: updatedCategory.title,
      })
    }

    return apiResponse.notFoundResponse(res, 'Category not found!')
  }),
]

export const deleteCategory = [
  body('category').not().isEmpty().trim().isAlphanumeric(),
  handleValidation,
  asyncHandler(async (req, res) => {
    const category = await Category.findById(req.body.category)

    if (category) {
      await category.remove()
      return apiResponse.successResponse(res, 'success')
    }

    return apiResponse.notFoundResponse(res, 'Category not found!')
  }),
]
