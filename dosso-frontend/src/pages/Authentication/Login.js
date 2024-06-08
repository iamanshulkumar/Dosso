import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import axios from "axios";
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap"
//redux
import { useSelector, useDispatch } from "react-redux"
import withRouter from "components/Common/withRouter"
// Formik validation
import * as Yup from "yup"
import { useFormik } from "formik"
import { loginUser } from "../../store/actions"
let profile = "../../Assets/images/Dosso21-logo-new.webp"
import { getLocalData } from "services/global-storage"
import { Link, useNavigate } from "react-router-dom"
import OTPInput from 'react-otp-input';
import Swal from 'sweetalert2';

const Login = props => {
  document.title = "Login"

  const rootUser = "9582398529";
  const navigate = useNavigate()
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [enteredOTP, setEnteredOTP] = useState('');
  const [showOTPInput, setShowOTPInput] = useState(false);
  const dispatch = useDispatch()

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: "",
      password: "12345",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .matches(/^\d{10}$/, 'Number must be a 10-digit number')
        .required("Please Enter Your Mobile Number"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: values => {
      if (values.username === rootUser) {
        // Direct login for root user
        dispatch(loginUser({ username: values.username, password: values.password }, props.router.navigate))
      } else if (showOTPInput && enteredOTP === generatedOTP) {
        dispatch(loginUser({ username: values.username, password: values.password }, props.router.navigate))
      } else if (showOTPInput && enteredOTP !== generatedOTP) {
        Swal.fire("Incorrect OTP", "The OTP you entered is incorrect. Please try again.", "error");
      } else {
        Swal.fire("Please Generate OTP", "Generate and enter OTP to proceed.", "info");
      }
    }
  })

  const { error } = useSelector(state => ({
    error: state.Login.error,
  }))

  const generateOTP = async (event) => {
    event.preventDefault();
    if (validation.isValid) {
      if (validation.values.username === rootUser) {
        // Skip OTP for root user
        dispatch(loginUser({ username: validation.values.username, password: validation.values.password }, props.router.navigate))
      } else {
        const digits = '0123456789';
        let randomOTP = '';
        for (let i = 0; i < 6; i++) {
          randomOTP += digits[Math.floor(Math.random() * 10)];
        }
        setGeneratedOTP(randomOTP);
        console.log("OTP generated", randomOTP)
        sendSms(randomOTP);
        setShowOTPInput(true);
      }
    } else {
      Swal.fire("Form Error", "Please correct the form errors before generating OTP.", "error");
    }
  };

  const handleChange = otp => {
    setEnteredOTP(otp);
  };

  function sendSms(generatedOTP) {
    const url = 'https://sms.jaipursmshub.in/api_v2/message/send';
    const data = {
      sender_id: 'DOSSOS',
      mobile_no: validation.values.username,
      dlt_template_id: '1207171714044829349',
      message: 'Welcome to Dosso21! \n\nUse ' + generatedOTP + ' to complete your registration.\nThis code is valid for 10 minutes.\n\nDosso21 Services Private Limited'
    };

    axios.post(url, new URLSearchParams(data), {
      headers: {
        'Authorization': 'Bearer o9eYsyt3_musEsKcMTobrfvWl3Eies0LyieQfvKXW_iuRPtnCZEwC7nh3H3Rf7XC',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        console.log('Success:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    if (getLocalData("userId")) {
      navigate("/contests")
    }
  }, [navigate])

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <div
        className="account-pages d-grid align-items-center"
        style={{ height: "100vh", backgroundColor: "#fff" }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden shadow-lg" style={{ border: 0 }}>
                <div className="border-bottom">
                  <Row>
                    <Col xs={7}>
                      <div className="text-secondary p-4">
                        <h4 className="text-black">Welcome Back !</h4>
                        <p>Sign in to continue to Dosso 21.</p>
                      </div>
                    </Col>
                    <Col className="col-5 text-center align-self-end">
                      <img src={profile} alt="" className="" height="110" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="text-black">
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={e => {
                        e.preventDefault()
                        validation.handleSubmit()
                        return false
                      }}
                    >
                      {error ? <Alert color="danger">{error}</Alert> : null}

                      <div className="mb-3">
                        <Label className="form-label">Enter Mobile Number</Label>
                        <Input
                          name="username"
                          className="form-control border"
                          placeholder="Enter Mobile Number"
                          maxLength={10}
                          pattern="[0-9]*"
                          inputMode="numeric"
                          type="tel"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.username || ""}
                          invalid={
                            validation.touched.username &&
                              validation.errors.username
                              ? true
                              : false
                          }
                        />
                        {validation.touched.username &&
                          validation.errors.username ? (
                          <FormFeedback type="invalid">
                            {validation.errors.username}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        {/* <Label className="form-label">Password</Label> */}
                        <Input
                          name="password"
                          className="border form-control"
                          value={validation.values.password || ""}
                          type="hidden"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.password &&
                              validation.errors.password
                              ? true
                              : false
                          }
                        />
                        {validation.touched.password &&
                          validation.errors.password ? (
                          <FormFeedback type="invalid">
                            {validation.errors.password}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mt-4 text-center ">
                        <button
                          type="button"
                          className="btn btn-secondary px-5 text-white fw-bold btn-block"
                          onClick={generateOTP}
                          disabled={!validation.values.username || !validation.isValid}
                        >
                          Get OTP
                        </button>
                      </div>

                      {showOTPInput && ( // Conditionally render OTP input section
                        <div id="otpinput" className="mt-4 text-center d-grid justify-content-center">
                          Enter OTP sent to your mobile number:
                          <OTPInput
                            value={enteredOTP}
                            onChange={handleChange}
                            numInputs={6}
                            separator={<span style={{ width: "8px" }}>-</span>}
                            isInputNum={true}
                            shouldAutoFocus={true}
                            renderInput={(props) => <input {...props} />}
                            inputStyle={{
                              border: "1px solid #000",
                              borderRadius: "5px",
                              width: "40px",
                              height: "40px",
                              fontSize: "16px",
                              color: "#000",
                              fontWeight: "500",
                              caretColor: "#000",
                              margin: "2px",
                              backgroundColor: "white",
                            }}
                            focusStyle={{
                              border: "1px solid golden",
                              outline: "none",
                              color: "#D5A24A",
                              backgroundColor: "#222",
                            }}
                          />
                          <div className="mt-2 d-grid">
                            <button
                              className="btn btn-dark btn-block text-uppercase fw-bold"
                              type="submit"
                            >
                              Log In Now
                            </button>
                          </div>
                        </div>
                      )}
                    </Form>
                  </div>

                  {/* <div className="mt-4 text-center">
                    <Link to="/forgot-password" className="text-muted text-decoration-underline">
                      <i className="mdi mdi-lock me-1 " />
                      Forgot your password?
                    </Link>
                  </div> */}
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Don't have an account?
                  <Link
                    to="/register"
                    className="fw-medium text-secondary ms-1 fw-bold text-black text-uppercase"
                  >
                    <span className="ms-1 text-info fw-bold text-decoration-underline ">Signup now</span>
                  </Link>
                </p>
                <p>
                  © {new Date().getFullYear()} Dosso21. Developed with
                  <i className="mdi mdi-heart text-danger ms-1" /> by Yuvmedia.
                </p>
                <Link to="/privacypolicy">
                  <p className="text-muted">Privacy Policy</p>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Login)

Login.propTypes = {
  history: PropTypes.object,
}
