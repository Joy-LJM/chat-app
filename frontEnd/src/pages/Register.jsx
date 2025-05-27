import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { useMutation } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import { SUCCESS_CODE } from "../constants";
import { registerApi } from "../service/apis";
import { useRegisterMutation } from "../mutations";

export default function Login() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const { username, password, confirmPassword, email } = userInfo || {};
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleValidation = useCallback(() => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    } else if (username.trim().length < 3) {
      toast.error("Username should be at least 3 characters long");
      return false;
    } else if (password.trim().length < 6) {
      toast.error("Password should be at least 6 characters long");
      return false;
    } else if (!email) {
      toast.error("Email is required");
      return false;
    }
    return true;
  }, [password, confirmPassword, username, email]);

  const registerMutation = useRegisterMutation();
  const handleSubmit = useCallback(() => {
    if (handleValidation()) {
      registerMutation.mutate({
        username,
        password,
        email,
      });
    }
  }, [email, handleValidation, password, registerMutation, username]);

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
            <img src="/assets/logo.svg" alt="Logo" />
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
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleChangeInput}
            value={confirmPassword}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChangeInput}
            value={email}
          />
          <button type="submit" onClick={handleSubmit}>
            REGISTER
          </button>
          <span>
            already have an account? <Link to="/login"> Login</Link>
          </span>
        </div>
      </FormContainer>
    </>
  );
}

export const FormContainer = styled.div`
  background: #131324;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
  .box {
    background: #0a0a13;
    color: #fff;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 3rem 5rem;
    border-radius: 2rem;
  }
  header {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    gap: 1rem;

    img {
      width: 2rem;
      height: 2rem;
    }
  }

  input {
    border-radius: 0.4rem;
    padding: 0.5rem;
    border: 1px solid #4e0eff;
    background-color: transparent;
    outline: none;
    color: #fff;
    width: 100%;
    font-size: 1rem;
    box-sizing: border-box;
    &:focus {
      border-color: #997af0;
    }
  }
  button {
    width: 100%;
    border-radius: 0.4rem;
    background: #4e0eff;
    color: #fff;
    border: none;
    padding: 1rem 2rem;
    cursor: pointer;
  }
  a {
    color: #4e0eff;
    text-decoration: none;
  }
  span {
    text-transform: uppercase;
  }
`;
