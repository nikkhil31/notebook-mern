import { Button, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  useAddNoteMutation,
  useNoteQuery,
  useUpdateNoteMutation,
} from '../services/notebook'
import { setForm, setNote } from '../slices/activeSlice'

const NoteEditor = () => {
  const [heading, setHeading] = useState('')
  const [desc, setDesc] = useState('')

  const toast = useToast()
  const dispatch = useDispatch()

  const { category, note, form } = useSelector(state => state.active)

  const [updatedNote, { isLoading: updateLoading }] = useUpdateNoteMutation()
  const [addNote, { isLoading: addLoading }] = useAddNoteMutation()

  const { data } = useNoteQuery(note)

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      if (form) {
        await updatedNote({
          note,
          title: heading,
          category,
          description: desc,
        })
      } else {
        let _note = await addNote({
          title: heading,
          category,
          description: desc,
        }).unwrap()

        console.log(_note)

        dispatch(setNote(_note.data._id))
        dispatch(setForm(1))
      }

      toast({
        status: 'success',
        title: 'Success',
        description: 'Note has been saved!',
        isClosable: true,
      })
    } catch (error) {
      toast({
        status: 'error',
        title: 'Error',
        description: error.data.message,
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    data?.data?.title ? setHeading(data.data.title) : setHeading('')
    data?.data?.description ? setDesc(data.data.description) : setDesc('')
  }, [data])

  return (
    <div className='noteeditor box'>
      {category && (
        <form onSubmit={handleSubmit}>
          <div className='heading'>
            <input
              type='text'
              name='heading'
              placeholder='Heading'
              onChange={e => setHeading(e.target.value)}
              value={heading}
            />
          </div>

          <div className='textarea'>
            <textarea
              name='desc'
              onChange={e => setDesc(e.target.value)}
              value={desc}
            />
          </div>

          {/* <button className='toolbar' type='submit'>
          Save
        </button>
         */}

          <Button
            isLoading={addLoading || updateLoading}
            colorScheme='teal'
            className='toolbar'
            type='submit'
            variant='solid'
          >
            Submit
          </Button>
        </form>
      )}
    </div>
  )
}

export default NoteEditor
