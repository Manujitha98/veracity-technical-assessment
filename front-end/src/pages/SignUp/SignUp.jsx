import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FormElement } from "../../components/FormElement";
import { userService } from "../../services/userService";

const SignUp = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      await userService.register(userDetails);
      window.location.href = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
    }
  };

  const validateForm = () => {
    if (
      !userDetails.email ||
      !userDetails.password ||
      !userDetails.confirmPassword ||
      !userDetails.firstName ||
      !userDetails.lastName
    ) {
      return true;
    } else return false;
  };

  return (
    <div className="div-center">
      <div className="content login-box">
        <h3>Sign Up</h3>
        <hr />
        <div className="form-group">
          <FormElement
            name={"firstName"}
            type={"text"}
            data={userDetails}
            handleInputChange={handleInputChange}
            placeholder={"First Name"}
          />
        </div>
        <div className="form-group">
          <FormElement
            name={"lastName"}
            type={"text"}
            data={userDetails}
            handleInputChange={handleInputChange}
            placeholder={"Last Name"}
          />
        </div>
        <div className="form-group">
          <FormElement
            name={"email"}
            type={"email"}
            data={userDetails}
            handleInputChange={handleInputChange}
            placeholder={"Email"}
          />
        </div>
        <div className="form-group">
          <FormElement
            name={"password"}
            type={"password"}
            data={userDetails}
            handleInputChange={handleInputChange}
            placeholder={"Password"}
          />
        </div>

        <div className="form-group">
          <FormElement
            name={"confirmPassword"}
            type={"password"}
            data={userDetails}
            handleInputChange={handleInputChange}
            placeholder={"Confirm Password"}
          />
        </div>

        <button
          className="btn btn-block btn-primary w-100 mt-md-2"
          onClick={handleSubmit}
          disabled={validateForm()}
        >
          Sign Up
        </button>
        <hr />
        <Link className="btn btn-block btn-primary w-100 mt-md-2" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
