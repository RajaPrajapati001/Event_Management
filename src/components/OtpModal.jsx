import React, { useState, useEffect } from 'react';
import OtpInput from 'react-otp-input';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetOtpMutation } from "./services";
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css"

function OtpModal({ showModal, setShowModal, otpData }) {
    const [isDisabled, setIsDisabled] = useState(false);
    useEffect(()=>{
        setTimeout(() => {
            setIsDisabled(true);
            console.log("Button disabled after 60 seconds.");
          }, 60000);
    },[showModal])
    function disableBtn(){
        setTimeout(() => {
            setIsDisabled(true);
            console.log("Button disabled after 60 seconds.");
          }, 60000);
    }
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(59);
  const [resendAttempts, setResendAttempts] = useState(0);
  const [alertShown, setAlertShown] = useState(false);
  const handleClose = () => setShowModal(false);
  const [resendOtp] = useGetOtpMutation();

  const formik = useFormik({
    initialValues: { otp: '' },
    validationSchema: Yup.object({
      otp: Yup.string()
        .required('OTP is required')
        .length(4, 'OTP must be exactly 4 digits'),
    }),
    onSubmit: (values) => {
      const enteredOtp = values.otp;
      if (otpData.otp === enteredOtp) {
        alert("OTP has been verified");
      } else {
        alert('Wrong OTP');
      }
    },
  });

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleResend = async () => {
    if (resendAttempts < 3) {
        setIsDisabled(false);
        disableBtn();
      console.log("User is in resendAttempts");

      try {
        const response = await resendOtp(otpData.phoneOrEmail);
        console.log("User is in async");
        console.log('OTP resent:', response);
        otpData.otp = response.data.otp;
        setOtp('');
        setTimer(59);
        setResendAttempts((prev) => prev + 1);
      } catch (err) {
        console.error('Failed to resend OTP:', err);
      }
    } else {
      if (!alertShown) {
        toast.warn('Maximum resend attempts reached. Try again later.', {
          position: "top-center",
          autoClose: 8000,
          hideProgressBar: true,
          closeButton: true,
          className: 'custom-toast bg-dark text-white',
        });
        setAlertShown(true);
      }
      setResendAttempts(3);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' || /[0-9]/.test(e.key)) {
      return;
    } else {
      e.preventDefault();
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-50">
      <Modal
        show={showModal}
        onHide={handleClose}
        centered
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        className='w-100'
      >
        <Modal.Header className="d-flex justify-content-center">
          <Modal.Title>OTP Verification</Modal.Title>
          <Button variant="close" className='position-absolute otp-outline mt-2 me-2 top-0 end-0' onClick={handleClose} />
        </Modal.Header>

        <Modal.Body className="d-flex justify-content-center align-items-center">
          <Form onSubmit={formik.handleSubmit} className="modal-form">
            <h3 className="text-center fw-bold fs-5 pt-4 mb-4">Enter OTP</h3>
            <p className="fs-7 mb-4 px-md-5 mx-md-5 mx-0 px-3 text-center">
              We have sent an OTP to your email address or mobile number. Please enter it below.
            </p>
            <Row className="justify-content-center mb-3">
              <Col md={6} className="d-flex justify-content-center px-3 p-2 w-75">
                <OtpInput
                  value={otp}
                  onChange={(otp) => {
                    setOtp(otp);
                    formik.setFieldValue('otp', otp);
                  }}
                  numInputs={4}
                  className="otp-outline"
                  renderInput={(props) => (
                    <input
                      {...props}
                      className="form-control text-center otp-field mx-1 otp-width otp-outline border-0 bg-light"
                      onKeyDown={handleKeyDown}
                      style={{ color: 'black' }}
                    />
                  )}
                />
              </Col>
            </Row>
            {formik.errors.otp && formik.touched.otp && (
              <Row className="text-center text-danger mb-3 fs-7 formargin">
                <Col>{formik.errors.otp}</Col>
              </Row>
            )}
            {timer > 0 ? (
              <Row className="text-center text-dark mb-3 py-2 fs-7">
                <Col>Resend OTP in {timer} seconds</Col>
              </Row>
            ) : (
              <Row className="text-center mb-3 py-2 fs-7">
                <Col>
                  Didn't receive OTP?{' '}
                  <p
                    href="#"
                    onClick={handleResend}
                    className={`d-inline crs ${resendAttempts >= 3 ? 'text-muted' : 'text-primary'}`}
                  >
                    Resend
                  </p>
                </Col>
              </Row>
            )}
            <Row>
              <Col className="d-flex justify-content-center">
                <Button
                  type="submit"
                  className="text-white fw-medium bg-whole border-0 rounded-3 fs-7 py-2 mb-4 w-50"
                  disabled={isDisabled}
                >
                  Verify OTP
                </Button>
              </Col>
            </Row>
            <ToastContainer />
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default OtpModal;
