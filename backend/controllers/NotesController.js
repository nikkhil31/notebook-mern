import asyncHandler from 'express-async-handler'
import { body, validationResult } from 'express-validator'
import * as apiResponse from '../helper/apiResponse.js'
import { checkCategoryExist } from '../helper/checkDuplication.js'
import handleValidation from '../middleware/handleValidation.js'
import Note from '../models/noteModel.js'

export const getNote = asyncHandler(async (req, res) => {
  const id = req.query?.note === 'null' ? null : req.query?.note
  const category =
    req.query?.category === 'null' || req.query?.category === 'undefined'
      ? null
      : req.query?.category

  let finedNote = req.query?.note ? {} : []

  // finedNote = id ? await Note.findById(id) : await Note.find({ category })

  if (id) {
    finedNote = await Note.findById(id)
  }

  if (category) {
    finedNote = await Note.find({ category })
  }

  return apiResponse.successResponseWithData(res, 'success', finedNote)
})

export const addNote = [
  body('title').not().isEmpty().trim(),
  body('category').not().isEmpty().trim().custom(checkCategoryExist),
  body('description').not().isEmpty(),
  handleValidation,
  asyncHandler(async (req, res) => {
    let note = new Note(req.body)
    note = await note.save()

    return apiResponse.successResponseWithData(res, 'success', note)
  }),
]

export const updateNote = [
  body('title').optional().trim(),
  body('category').optional().trim(),
  body('description').optional().trim(),
  handleValidation,
  asyncHandler(async (req, res) => {
    const note = await Note.findById(req.body.note)

    if (note) {
      req.body.title && (note.title = req.body.title)
      req.body.category && (note.category = req.body.category)
      req.body.description && (note.description = req.body.description)

      let updatedNote = await note.save()

      return apiResponse.successResponseWithData(res, 'success', updatedNote)
    }

    return apiResponse.notFoundResponse(res, 'Category not found!')
  }),
]

export const deleteNote = [
  body('note').not().isEmpty().trim().isAlphanumeric(),
  handleValidation,
  asyncHandler(async (req, res) => {
    const note = await Note.findById(req.body.note)

    if (note) {
      await note.remove()
      return apiResponse.successResponse(res, 'success')
    }

    return apiResponse.notFoundResponse(res, 'Note not found!')
  }),
]
