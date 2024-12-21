import React from "react";
import { useFormik } from "formik";
import Inputs from "./Inputs";
import * as Yup from "yup";
import "../index.css";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const Login_content = () => {
  const formik = useFormik({
    initialValues: {
      Username: "",
      Password: "",
    },
    validationSchema: Yup.object({
      Username: Yup.string()
        .required("Please enter your phone number or email")
        .test(
          "is-valid",
          "Invalid phone number or email",
          (value) =>
            /^[6-9][0-9]{9}$/.test(value) ||
            Yup.string().email().isValidSync(value)
        ),
      Password: Yup.string()
        .min(8, "Invalid Password")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "Incorrect Password"
        )
        .max(20, "Invalid Password")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      console.log("Form Submitted:", values);
      toast.success("Successfully Logined");
    },
  });

  return (
    <>
      <Form onSubmit={formik.handleSubmit} className="w-50 my-form">
        <h3 className="text-center fw-bold fs-5 mb-5">LOGIN</h3>
        <Inputs
          name="Username"
          type="text"
          formik={formik}
          placeholder="Enter Phone no. or Email"
          icon={<AiOutlineUser />}
        />
        <Inputs
          name="Password"
          type="password"
          formik={formik}
          placeholder="Password"
          icon={<AiOutlineLock />}
        />
        <div id="forpsw" className="text-end text-primary crs fs-7 mb-4">
          <Link to="/ForgetPass">Forgot Password?</Link>
        </div>
        <Button
          type="submit"
          className="text-white fw-medium bg-whole border-0 rounded-3 mb-3 w-100 fs-7 py-2"
        >
          Login Now
        </Button>
        <br></br>
        <Link to="/LoginWithOTP">
          {" "}
          <Button
            type="submit"
            className=" bg-white fw-medium rounded-3 mb-4 w-100 fs-7 py-2 border-whole"
          >
            Login With OTP
          </Button>
        </Link>
        <div className="fs-7">
          Don't have any accout?{" "}
          <Link to="/SignUp">
            <u className="text-primary crs">Sign Up</u>
          </Link>
        </div>
      </Form>
    </>
  );
};

export default Login_content;
