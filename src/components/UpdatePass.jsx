import React from 'react'
import {useFormik} from "formik";
import Inputs from "./Inputs";
import * as Yup from "yup";
import "../index.css"
import { AiOutlineLock } from "react-icons/ai";
import { Button,Form } from 'react-bootstrap';

const UpdatePass = () => {
     const formik = useFormik({
        initialValues: {
            NewPassword: "", 
            ConfirmPassword: "",  
        },
        validationSchema: Yup.object({
            NewPassword: Yup.string()
            .min(8, "Password must be at least 8 characters.")
            .max(20, "Password must not exceed 20 characters.")
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
            )
            .required("Password is required"),
                      ConfirmPassword: Yup.string().oneOf([Yup.ref("NewPassword")],"Password should be same").required("Password is required"),
        }),
        onSubmit: (values) => {
          console.log("Form Submitted:", values);
        },
      });
  return (
    <>
     <Form onSubmit={formik.handleSubmit} className='w-50 my-form'>
      <h3 className='text-center fw-bold fs-5 mb-4'>Update Your Password</h3>
      <p className='fs-7 mb-4'>Enter your new password below</p>
  <Inputs name="NewPassword" type="password" formik={formik} placeholder="Password" icon={<AiOutlineLock />}/>
  <Inputs name="ConfirmPassword" type="password" formik={formik} placeholder="Confirm Password" icon={<AiOutlineLock />}/>
  <Button type="submit" className='text-white fw-medium bg-whole border-0 rounded-3 w-100 fs-7 py-2 mt-3'>Update</Button>
</Form>
    </>
  )
}

export default UpdatePass