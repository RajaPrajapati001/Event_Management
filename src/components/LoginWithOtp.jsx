import React from 'react'
import { useFormik } from "formik";
import * as Yup from "yup"
import Inputs from './Inputs';
import "../index.css"
import { AiOutlineUser } from "react-icons/ai";
import { Link } from 'react-router-dom';
import {Button,Form} from "react-bootstrap"

const LoginWithOtp = () => {
     const formik = useFormik({
        initialValues: {
            MobileOrEmail: "", 
          Password: "",  
        },
        validationSchema: Yup.object({
            MobileOrEmail:   Yup.string()
                    .required('Please enter your phone number or email')
                    .test('is-valid', 'Invalid phone number or email', value => 
                      /^[6-9][0-9]{9}$/.test(value) || Yup.string().email().isValidSync(value)
                    ),
          Password: Yup.string().min(6,"Password must be at least 6 characters").required("Password is required"),
        }),
        onSubmit: (values) => {
          console.log("Form Submitted:", values);
        },
      });
  return (
    <>
        <Form onSubmit={formik.handleSubmit} className='w-50 my-form'>
      <h3 className='text-center fw-bold fs-5 mb-4'>LOGIN WITH OTP</h3>
      <p className='fs-7 mb-4'>Please enter your registered email address or mobile number.</p>
  <Inputs name="MobileOrEmail" type="text" formik={formik} placeholder="Enter Phone no. or Email" icon={<AiOutlineUser />}/>
  <Button type="submit" className='text-white fw-medium bg-whole border-0 rounded-3 w-100 fs-7 py-2 mt-4 mb-'>Send OTP</Button><br></br>
  <Link to="/Login"><Button type="submit" className=' bg-white fw-medium rounded-3 mt-3 w-100 fs-7 py-2 border-whole'>Login With Password</Button></Link>
</Form>
    </>
  )
}

export default LoginWithOtp