import React from 'react'
import { useFormik } from "formik";
import * as Yup from "yup"
import Inputs from './Inputs';
import "../index.css"
import { AiOutlineUser } from "react-icons/ai";
import { Link } from 'react-router-dom';
import {Form,Button} from "react-bootstrap"
import { useNavigate } from 'react-router-dom';
const ForgetPass = () => {
    const navigate = useNavigate();
     const formik = useFormik({
            initialValues: {
                MobileForget: "", 
            },
            validationSchema: Yup.object({
                MobileForget:  Yup.string()
                        .required('Please enter your phone number or email')
                        .test('is-valid', 'Invalid phone number or email', value => 
                          /^[6-9][0-9]{9}$/.test(value) || Yup.string().email().isValidSync(value)
                        ),
            }),
            onSubmit: (values) => {
              console.log("Form Submitted:", values);
              navigate("/UpdatePass");
            },
          });
  return (
    <>
    <Form onSubmit={formik.handleSubmit} className='w-50 my-form'>
  <h3 className='text-center fw-bold fs-5 mb-4'>FORGET PASSWORD</h3>
  <p className='fs-7 mb-4'>To reset your password, enter your registered email address or mobile number.</p>
<Inputs name="MobileForget" type="text" formik={formik} placeholder="Enter Phone no. or Email" icon={<AiOutlineUser />}/>
<Button type="submit" className='text-white fw-medium bg-whole border-0 rounded-3 w-100 fs-7 py-2 mt-3 mb-3'>Get OTP</Button>
<Link to="/Login"><Button type="submit" className=' bg-white fw-medium rounded-3 w-100 fs-7 py-2 border-whole'>Back to Login</Button></Link>
</Form>
</>
  )
}

export default ForgetPass