import express from 'express'
const router = express.Router()

import * as AuthController from '../controllers/AuthController.js'
import * as CategoryController from '../controllers/CategoryController.js'
import * as NotesController from '../controllers/NotesController.js'
import { loginRequired } from '../middleware/authentication.js'

router.post('/auth', AuthController.login)

router.post('/register', AuthController.register)

router
  .route('/category')
  .get(loginRequired, CategoryController.getCategory)
  .post(loginRequired, CategoryController.addCategory)
  .put(loginRequired, CategoryController.updateCategory)
  .delete(loginRequired, CategoryController.deleteCategory)

router
  .route('/notes')
  .get(loginRequired, NotesController.getNote)
  .post(loginRequired, NotesController.addNote)
  .put(loginRequired, NotesController.updateNote)
  .delete(loginRequired, NotesController.deleteNote)

export default router
