import React, { useState, useContext } from "react";
import "./Login.css";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { app } from '../firebase/firebase';

import { useNavigate } from "react-router-dom";
import { TransactionContext } from "../context/TransactionContext";
const FormHeader = (props) => <h2 className="headerTitle">{props.title}</h2>;

const Form = (props) => (
  <div>
    <FormInput
      description="Username"
      placeholder="Enter your username"
      type="text"
      value={props.setEmail}
    />
    <FormInput
      description="Password"
      placeholder="Enter your password"
      type="password"
      value={props.setPassword}
    />
    <FormButton title="Log in" action={props.action} />
  </div>
);

const FormButton = (props) => (
  <div id="button123" className="row123">
    <button onClick={props.action} className="btn123">{props.title}</button>
  </div>
);

const FormInput = (props) => (
  <div className="row123">
    <label className="lab">{props.description}</label>
    <input
      type={props.type}
      className="formIN"
      placeholder={props.placeholder}
      onChange={(e) => props.value(e.target.value)}
    />
  </div>
);

export const Login = () => {
  const { setIsAdmin } = useContext(TransactionContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const handleAction = () => {
    const authentication = getAuth();
    signInWithEmailAndPassword(authentication, email, password)
      .then((response) => {
        console.log("first")
        setIsAdmin(true)
        navigate("/");
        sessionStorage.setItem(
          "Auth Token",
          response._tokenResponse.refreshToken
        );
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          toast.error("Please check the Password");
        }
        if (error.code === "auth/email-already-in-use") {
          toast.error("Email Already in Use");
        }
        if (error.code === "auth/user-not-found") {
          toast.error("Please check the Email");
        }
      });
  };
  return (
    <div className="loginform">
      <ToastContainer />
      <FormHeader title="Login" />
      <Form
        setPassword={setPassword}
        setEmail={setEmail}
        action={handleAction}
      />
    </div>
  );
};
export default Login;
