import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../UI/Input";
import { Button } from "@mui/material";
import { registerUser } from "../../../services/auth";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { isLogged, logIn, logOut } from "../../../redux/user.slice";

export default function Register() {
  const [password, setPassword] = useState(true);
  const [userData, setUserData] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (value) => {
    console.log(value);
    registerUser(value)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log("err, ", err);
      });
  };

  if (userData?.isOk) {
    dispatch(logIn());
    dispatch(isLogged(userData));
    navigate("/");
  } else {
    dispatch(logOut());
  }

  return (
    <div className="w-fit m-auto h-[100vh] flex items-center px-[50px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="text-[30px] text-center font-bold">Ro'yxatdan o'tish</p>
        <Link to="/login" className="text-[18px] font-semibold text-blue-700">
          Kirish
        </Link>
        <div className="mt-[20px]">
          <p className="font-semibold text-gray-700">Name *</p>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            {...register("name", {
              required: "this field is required",
            })}
            className={`${errors.name?.message && "border-red-500"}`}
          />
          <ErrorMessage error={errors?.name?.message} />

          <p className="font-semibold text-gray-700 mt-3">Email *</p>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            {...register("email", {
              required: "this field is required",
            })}
            className={`${errors.email?.message && "border-red-500"}`}
          />
          <ErrorMessage error={errors?.email?.message} />

          <p className="font-semibold text-gray-700 mt-3">Username *</p>
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
              className="absolute top-[6px] right-0 text-gray-600"
              onClick={() => setPassword((prev) => !prev)}
              type="button"
            >
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
            Ro'yxatdan o'tish
          </Button>
        </div>
      </form>
    </div>
  );
}

const ErrorMessage = ({ error }) => {
  return <div className="text-[red]">{error}</div>;
};
