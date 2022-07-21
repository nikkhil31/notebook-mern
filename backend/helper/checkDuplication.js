import Category from '../models/categoryModel.js'
import User from '../models/userModel.js'

export const checkEmailDuplication = async value => {
  //   console.log('from dupli')
  try {
    const user = await User.findUserByEmail(value)
    if (user) {
      return Promise.reject('E-mail already in use')
    }
  } catch (error) {
    return Promise.reject(error.message)
  }
}

export const checkCategoryExist = async value => {
  //   console.log('from dupli')
  try {
    const category = await Category.findById(value)
    if (!category) {
      return Promise.reject('Category is not exits!')
    }
  } catch (error) {
    return Promise.reject(error.message)
  }
}
