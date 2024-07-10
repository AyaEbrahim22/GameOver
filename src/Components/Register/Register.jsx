import React, { useState } from 'react'
import logo from '../../Assets/logo-sm.png'
import style from './Register.module.css'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import { Helmet } from 'react-helmet'

export default function Register() {

    const [registerd, setRegisterd] = useState(false)
    const [apiError, setApiError] = useState('')
    const [loading, setLoading] = useState(false)

    let validationSchema = Yup.object({
        first_name: Yup.string().required('First name is required'),
        last_name: Yup.string().required('Last name is required'),
        email: Yup.string().required('Email is required').email('Enter a valid email'),
        password: Yup.string().required('password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/, 'Minimum five chars, at least one letter and one number'),
        age: Yup.string().required('Age is required').matches(/^([1-7][0-9]|80)$/, 'Not a valid age')
    })

    let formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            age: ''
        }, onSubmit: submitForm
        , validationSchema
    })

    async function submitForm(values) {
        setRegisterd(false)
        setApiError('')
        setLoading(true)
        let { data } = await axios.post('https://movies-api.routemisr.com/signup', values)

        if (data.message === 'success') {
            setRegisterd(true)
            setApiError('')
            setLoading(false)

        } else {
            setApiError(data.errors.email.message)
            setRegisterd(false)
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
                Register
            </title>
        </Helmet>

        <div className={style.registerComponent}>
            <div className='container align-items-center justify-content-center containerShadow p-0 rounded-2'>
                <div className='row g-0'>
                    <div className='col-md-5'>
                        <div className={style.registerImage}></div>
                    </div>
                    <div className='col-md-7'>
                        <div className={style.formStyle}>
                            <img src={logo} alt='logo' className='mt-4' />
                            <h1>Register to Game Over</h1>
                            <form className='p-4' onSubmit={formik.handleSubmit}>
                                {apiError ? <div className="alert alert-danger p-2" role="alert">{apiError}</div> : ''}
                                {registerd ? <div className="bg-primary text-light text-center fw-bold mt-4 mb-3 p-2 rounded" role="alert">Your account registered successfully</div> : ''}

                                {(formik.errors.first_name && formik.touched.first_name) ? <div className="alert alert-danger p-2" role="alert">{formik.errors.first_name}</div> : ''}
                                {(formik.errors.last_name && formik.touched.last_name) ? <div className="alert alert-danger p-2" role="alert">{formik.errors.last_name}</div> : ''}

                                <div className='d-flex gap-3'>
                                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type='text' name='first_name' placeholder='First Name' className='form-control' />

                                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type='text' name='last_name' placeholder='Last Name' className='form-control' />
                                </div>

                                <div className='mt-3'>
                                    {(formik.errors.email && formik.touched.email) ? <div className="alert alert-danger p-2" role="alert">{formik.errors.email}</div> : ''}
                                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type='email' name='email' className='form-control' placeholder='Email Address' />
                                </div>

                                {(formik.errors.password && formik.touched.password) ? <div className="alert alert-danger p-2 mt-3" role="alert">{formik.errors.password}</div> : ''}

                                <div className='mt-3 position-relative'>
                                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} id='passwordInput' type='password' name='password' className='form-control' placeholder='Password' />
                                    <i onClick={(e) => showAndHide(e.target)} className="fa-solid fa-eye"></i>
                                </div>
                                <div className='mt-3'>
                                    {(formik.errors.age && formik.touched.age) ? <div className="alert alert-danger p-2" role="alert">{formik.errors.age}</div> : ''}
                                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type='number' name='age' className='form-control' placeholder='Age' />
                                </div>

                                {loading ? <button className='text-center w-100 mt-3 mb-4 text-light'>Registering...</button> : <button type='submit' className='text-center w-100 mt-3 mb-4 text-light'>Register</button>}
                                <span>Already a member?<Link to={'/'} className='text-secondary text-decoration-none'> LogIn </Link> </span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
