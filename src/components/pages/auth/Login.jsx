import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../UI/Input";
import { Button, Hidden } from "@mui/material";
import { login } from "../../../services/auth";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { isLogged, logIn } from "../../../redux/user.slice";

export default function Login() {
  const [password, setPassword] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (value) => {
    const { key, secret } = value;
    login(key, secret)
      .then((res) => {
        if (res.data.isOk) {
          dispatch(logIn());
          dispatch(isLogged(res.data));
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("err, ", err);
        alert(
          `Username or password is invalid. | ${err.status} ${err.statusText}`
        );
      });
  };

  return (
    <div className="w-fit m-auto h-[100vh] flex items-center px-[50px]">
      <div>
        <p className="text-[30px] text-center font-bold">Kirish</p>
        <Link
          to="/register"
          className="text-[18px] font-semibold text-blue-700"
        >
          Ro'yxatdan o'tish.
        </Link>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-[20px]">
          <p className="font-semibold text-gray-700">Username *</p>
          <Input
            type="text"
            name="key"
            placeholder="Username"
            {...register("key", {
              required: "this field is required",
            })}
            className={`${errors.key?.message && "border-red-500"}`}
          />
          <ErrorMessage error={errors?.key?.message} />
          <p className="font-semibold text-gray-700 mt-3">Password *</p>
          <div className="w-fit relative">
            <Input
              type={password ? "password" : "text"}
              name="secret"
              placeholder="Password"
              {...register("secret", {
                required: "this field is required",
              })}
              className={`${errors.secret?.message && "border-red-500"}`}
            />
            <button 
            className="absolute top-[6px] text-gray-600 right-0"
            onClick={() => setPassword((prev) => !prev)}
            type="button">
              {" "}
              {password ? (
                <i className="fa-solid fa-eye-slash"></i>
              ) : ( 
                <i className="fa-solid fa-eye"></i>
              )}{" "}
            </button>
          </div>
          <ErrorMessage error={errors?.secret?.message} />
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "100%",
              fontSize: "18px",
              marginTop: "40px",
            }}
          >
            Kirish
          </Button>
        </form>
      </div>
    </div>
  );
}

const ErrorMessage = ({ error }) => {
  return <div className="text-[red]">{error}</div>;
};
