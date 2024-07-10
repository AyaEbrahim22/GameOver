import React, { useState } from 'react'
import logo from '../../Assets/logo-sm.png'
import style from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import { Helmet } from 'react-helmet'

export default function Login() {

  let navigate = useNavigate()
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)

  let validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Enter a valid email'),
    password: Yup.string().required('password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/, 'Minimum five chars, at least one letter and one number'),
  })

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    }, onSubmit: submitForm
    , validationSchema
  })

  async function submitForm(values) {
    setApiError('')
    setLoading(true)
    let { data } = await axios.post('https://movies-api.routemisr.com/signin', values)

    if (data.message === 'success') {
      localStorage.setItem('userToken', data.token)
      setApiError('')
      setLoading(false)
      navigate('/')

    } else {
      setApiError(data.message)
      setLoading(false)
    }
  }

  function showAndHide(eye) {

    if (eye.classList.contains('fa-eye')) {
      eye.classList.add('fa-eye-slash')
      eye.classList.remove('fa-eye')
      document.getElementById('passwordInput').setAttribute('type', 'text');

    } else {
      eye.classList.add('fa-eye')
      eye.classList.remove('fa-eye-slash')
      document.getElementById('passwordInput').setAttribute('type', 'password');
    }

  }

  return <>

    <Helmet>
      <title>
        Login
      </title>
    </Helmet>

    <div className={style.loginComponent}>
      <div className='container align-items-center justify-content-center containerShadow p-0 rounded-2'>
        <div className='row g-0 rounded'>
          <div className='col-md-5'>
            <div className={style.loginImage}></div>
          </div>
          <div className='col-md-7'>
            <div className={style.formStyle}>
              <img src={logo} alt='logo' className='mt-4' />
              <h1>Login to Game Over</h1>
              <form className='p-4' onSubmit={formik.handleSubmit}>
                {apiError ? <div className="alert alert-danger p-2" role="alert">{apiError}</div> : ''}

                <div className='mt-3'>
                  {(formik.errors.email && formik.touched.email) ? <div className="alert alert-danger p-2" role="alert">{formik.errors.email}</div> : ''}
                  <input onBlur={formik.handleBlur} onChange={formik.handleChange} type='email' name='email' className='form-control' placeholder='Email Address' />
                </div>

                {(formik.errors.password && formik.touched.password) ? <div className="alert alert-danger p-2 mt-3" role="alert">{formik.errors.password}</div> : ''}
                <div className='mt-3 position-relative'>
                  <input onBlur={formik.handleBlur} onChange={formik.handleChange} id='passwordInput' type='password' name='password' className='form-control' placeholder='Password' />
                  <i onClick={(e) => showAndHide(e.target)} className="fa-solid fa-eye"></i>
                </div>

                {loading ? <button className='text-center w-100 mt-3 mb-4 text-light'>Loading...</button> : <button type='submit' className='text-center w-100 mt-3 mb-4 text-light'>Login</button>}
                <span>Not a member yet? <Link to={'/register'} className='text-secondary text-decoration-none'>  Create Account </Link> </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}
