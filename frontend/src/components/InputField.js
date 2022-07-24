import React from 'react'

const InputField = ({ name, register, errors }) => {
  return (
    <div className='form-field'>
      <input type={'text'} placeholder={name} {...register} />
      <span>
        {errors.email?.type === 'required' && `${name} is Required!`}
        {errors.email?.type === 'pattern' && 'Please enter valid Value!'}
      </span>
    </div>
  )
}

export default InputField
