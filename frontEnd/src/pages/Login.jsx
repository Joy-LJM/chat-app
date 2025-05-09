import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

import { SUCCESS_CODE } from "../constants";
import { FormContainer } from "./Register";
import { loginApi } from "../service/apis";

export default function Login() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });
  const { username, password } = userInfo || {};
  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem("userInfo")){
      navigate("/")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const handleSubmit = useCallback(() => {
    if(!username){
      toast.error("Username is required!");
      return;
    }
    if(!password){
      toast.error("Password is required!");
      return;
    }
    axios
      .post(loginApi, {
        username,
        password,
      })
      .then((res) => {
        const { code, message } = res.data || {};
        if (code === SUCCESS_CODE) {
            navigate("/");
          localStorage.setItem("userInfo",JSON.stringify(res.data?.user))
        } else {
          toast.error(message)
        }
      });
  }, [username, password, navigate]);
 

  // instead of defining handle change functions for each input, we can use object destructuring to update the state in one line and update target state by name.
  // const handleChangePsw = (e) => {
  //   setUserInfo((pre) => {
  //     return {
  //       ...pre,
  //       password: e.target.value,
  //     };
  //   });
  // };
  const handleChangeInput = (e) => {
    setUserInfo({
        ...userInfo,
        [e.target.name]: e.target.value,
      });
  };

  return (
    <>
     <ToastContainer />
    <FormContainer>
    
      <div className="box">
        
        <header>
          <img src="../assets/logo.svg" alt="Logo" />
          <span>SNAPPY</span>
        </header>
          <input
            type="text"
            placeholder="User Name"
            name="username"
            onChange={handleChangeInput}
            value={username}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChangeInput}
            value={password}
          />
          <button onClick={handleSubmit}>LOG IN</button>
          <span>
            DON'T HAVE AN ACCOUNT? <Link to="/register"> CREATE ONE</Link>
          </span>
      </div>
    </FormContainer>
    </>
  );
}

