import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { registerApi } from "../service/apis";
import { SUCCESS_CODE } from "../constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useRegisterMutation = () => {
  const navigate = useNavigate();

 return useMutation({
    mutationFn: ({ username, password, email }) =>
      axios.post(registerApi, {
        username,
        password,
        email,
      }),
    onSuccess: (res) => {
      const { code, message } = res.data || {};
      if (code === SUCCESS_CODE) {
        navigate("/");
        localStorage.setItem(
          process.env.USER_INFO,
          JSON.stringify(res.data?.user)
        );
      } else {
        toast.error(message);
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
};
