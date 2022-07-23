import React from 'react'
import { useForm } from 'react-hook-form'
// import { useLoginMutation } from '../services/notebook'
import { emailRegex } from '../utils/utils'

const Login = () => {
  // const [login, responseInfo] = useLoginMutation()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const onSubmit = data => {
    return console.log(data)
  }

  return (
    <div className='container'>
      <div className='loginBox'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-field'>
            <input
              type={'text'}
              placeholder='Email'
              {...register('email', { required: true, pattern: emailRegex })}
            />
            <span>
              {errors.email?.type === 'required' && 'Email is Required!'}
              {errors.email?.type === 'pattern' && 'Please enter valid email!'}
            </span>
          </div>
          <div className='form-field'>
            <input
              type={'password'}
              placeholder='Password'
              {...register('password', { required: true })}
            />
            <span>
              {errors.password?.type === 'required' && 'Password is Required!'}
            </span>
          </div>
          <div className='form-field'>
            <input type={'submit'} name='submit' value={'Submit'} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
