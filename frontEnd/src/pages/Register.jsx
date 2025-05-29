import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

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

  // TODO: 可以考虑添加密码强度指示器

  // TODO:可以优化错误消息的显示方式

  const registerMutation = useRegisterMutation();
  const handleSubmit = useCallback(() => {
    registerMutation.mutate({
      username,
      password,
      email,
    });
  }, [email, password, registerMutation, username]);

  // TODO :可以添加表单输入内容的实时验证
  const handleChangeInput = useCallback(
    (e) => {
      setUserInfo({
        ...userInfo,
        [e.target.name]: e.target.value,
      });
    },
    [userInfo]
  );
  const [formErr, setFormErr] = useState({
    usernameErr: "",
    passwordErr: "",
    emailErr: "",
    confirmPasswordErr: "",
  });
  // 防抖函数
  const useDebounce = (callback, delay) => {
    const timer = React.useRef();
    
    return (...args) => {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  };

  // 统一验证逻辑
  const validateField = (name, value) => {
    const validations = {
      username: {
        test: val => val.length >= 3,
        message: "Username should be at least 3 characters long"
      },
      password: {
        test: val => val.length >= 6,
        message: "Password should be at least 6 characters long"
      },
      confirmPassword: {
        test: val => val === password,
        message: "Passwords do not match"
      },
      email: {
        test: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
        message: "Email is invalid"
      }
    };

    if (!validations[name]) return;
    
    const isValid = validations[name].test(value);
    setFormErr(prev => ({
      ...prev,
      [`${name}Err`]: isValid ? "" : validations[name].message
    }));
  };

  // 防抖验证函数
  const debouncedValidate = useDebounce((name, value) => {
    validateField(name, value);
  }, 300);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    handleChangeInput(e);
    debouncedValidate(name, value);
  };
  const ErrorMsg = ({ children }) => {
    return <div style={{ color: "red" }}>{children}</div>;
  };

  return (
    <>
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
            onChange={handleFieldChange}
            value={username}
          />
          {formErr.usernameErr && <ErrorMsg>{formErr.usernameErr}</ErrorMsg>}
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleFieldChange}
            value={password}
          />
          {formErr.passwordErr && <ErrorMsg>{formErr.passwordErr}</ErrorMsg>}
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleFieldChange}
            value={confirmPassword}
          />
          {formErr.confirmPasswordErr && (
            <ErrorMsg>{formErr.confirmPasswordErr}</ErrorMsg>
          )}
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleFieldChange}
            value={email}
          />
          {formErr.emailErr && <ErrorMsg>{formErr.emailErr}</ErrorMsg>}
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? "Processing..." : "REGISTER"}
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
