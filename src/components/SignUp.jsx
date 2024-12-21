import "../index.css";
import React from 'react';
import { useFormik } from 'formik';
import Inputs from './Inputs';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import { AiOutlineUser,AiOutlineLock, AiOutlineMobile } from "react-icons/ai";
import {Link} from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { useGetOtpMutation } from "./services";
import { useState } from "react";
import OtpModal from "./OtpModal"

const SignUp = () => {
  const [otpData,setOtpData]=useState(null);
  const [showModal, setShowModal] = useState(false);
    const [sendData] = useGetOtpMutation();
    const navigate=useNavigate();
  const formik = useFormik({
   
  
    initialValues: {
      firstName: '',
      lastName: '',
      phoneOrEmail: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().min(2).max(25).required('Please enter your first name'),
      lastName: Yup.string().min(2).max(25).required('Please enter your last name'),
      phoneOrEmail: Yup.string()
        .required('Please enter your phone number or email')
        .test('is-valid', 'Invalid phone number or email', value => 
          /^[6-9][0-9]{9}$/.test(value) || Yup.string().email().isValidSync(value)
        ),
      password:Yup.string()
      .min(8, "Password must be at least 8 characters.")
      .max(20, "Password must not exceed 20 characters.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      )
      .required("Password is required"),
    
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Please confirm your password'),
    }),
    onSubmit:async (values) => {
      try {
        console.log(values)
        const response=await sendData(values.phoneOrEmail);
        if(response.data.status=="exits"){
          alert("User already exists")
        }else{
          console.log(values)
           console.log(response.data.otp)
          setOtpData({...values,otp:response.data.otp})
      setShowModal(true);
    }
      } catch (err) {
        console.log('Failed to send data:', err);
      }
  
  },
});

  return (
    <><div className="w-50 my-form">
    <h3 className='text-center fw-bold fs-5 mb-4'>Sign Up</h3>
    <p className='fs-7 mb-4'>Enter your new password below</p>
        <Form onSubmit={formik.handleSubmit} >
              <Inputs name="firstName" formik={formik} placeholder="Enter first name" icon={<AiOutlineUser />} type="text"/>
              <Inputs name="lastName" formik={formik} placeholder="Enter last name" icon={<AiOutlineUser />} type="text"/>
              <Inputs name="phoneOrEmail" formik={formik} placeholder="Enter phone number or email" icon={<AiOutlineMobile />} type="text"/>
              <Inputs name="password" formik={formik} placeholder="Enter password" icon={<AiOutlineLock />} type="password"/>
              <Inputs name="confirmPassword" formik={formik} type="password" placeholder="Confirm password" icon={<AiOutlineLock />}/>
             <Button type="submit" className='text-white fw-medium bg-whole border-0 rounded-3 w-100 fs-7 py-2 mt-2'>SignUp</Button><br></br>
        </Form>
        <div className='fs-7 mt-3'>Already have any accout? <Link to="/Login"><u className='text-primary crs'>Log In</u></Link></div>
        {showModal && <OtpModal showModal={showModal} setShowModal={setShowModal} otpData={otpData} />}
        </div>
        </>
      
  );
};

export default SignUp;
