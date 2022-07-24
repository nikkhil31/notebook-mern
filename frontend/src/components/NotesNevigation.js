import { useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  useAddCategoryMutation,
  useCategoriesQuery,
} from '../services/notebook'
import { setCategory } from '../slices/activeSlice'

const NotesNevigation = () => {
  const [showFiled, setshowFiled] = useState(false)
  const [inputVal, setInputVal] = useState('')

  const toast = useToast()
  const active = useSelector(state => state.active.category)
  const dispatch = useDispatch()

  const { data } = useCategoriesQuery()

  const [addCategory] = useAddCategoryMutation()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      if (inputVal) {
        await addCategory({ title: inputVal }).unwrap()
      }
      setInputVal('')
      setshowFiled(false)
    } catch (error) {
      toast({
        status: 'error',
        title: 'Error',
        description: error.data.message,
        isClosable: true,
      })
    }
  }

  return (
    <nav className='navigation' onDoubleClick={() => setshowFiled(!showFiled)}>
      <div className='logo' />
      <div className='listcontainer'>
        <ul className='list'>
          {showFiled && (
            <li className='active'>
              <form onSubmit={handleSubmit}>
                <input
                  type={'text'}
                  onChange={e => setInputVal(e.target.value)}
                  value={inputVal}
                />
              </form>
            </li>
          )}

          {data?.data &&
            data.data.map(category => (
              <li
                key={category._id}
                className={active === category._id ? 'active' : ''}
                onClick={() => dispatch(setCategory(category._id))}
              >
                {category.title}
              </li>
            ))}
        </ul>
      </div>
    </nav>
  )
}

export default NotesNevigation
