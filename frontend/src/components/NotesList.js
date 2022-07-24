import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNotesQuery } from '../services/notebook'
import { setForm, setNote } from '../slices/activeSlice'

const NotesList = () => {
  const dispatch = useDispatch()

  const categoryActive = useSelector(state => state.active.category)
  const noteActive = useSelector(state => state.active.note)

  const { data } = useNotesQuery(categoryActive)

  // console.log(data)

  const handleDoubleClick = () => {
    dispatch(setNote(null))
    dispatch(setForm(0))
  }

  return (
    <div className='noteslist box' onDoubleClick={handleDoubleClick}>
      <div className='search'>
        <FaSearch className='searchicon' />
        <input type='text' name='search' placeholder='Search' />
      </div>
      <ul className='notescontainer'>
        {data?.data &&
          data?.data.map(note => (
            <li
              key={note._id}
              className={noteActive === note._id ? 'active' : ''}
              onClick={() => dispatch(setNote(note._id))}
            >
              <p className='title'>{note.title}</p>
              <div>
                <p className='para'>{note.description}</p>
                {/* <p className='time'>2 days</p> */}
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default NotesList
