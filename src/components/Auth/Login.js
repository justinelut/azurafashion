"use client"
import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import Button from "@/components/Buttons/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginschema } from "@/components/Auth/schemavalidation";
import { usePocketbase } from "@/app/provider";
import { useRouter } from "next/navigation";
import SigninWithGoogle from "@/components/Auth/signinwithgoogle";

const Login = ({
  onRegister,
  onForgotPassword,
  errorMsg
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(loginschema) });
  const [userEmailPasswordError, setPasswordEmailError] = useState()
  const router = useRouter()
  const { login } = usePocketbase();

  const onSubmit = async (data, e) => {
    e.preventDefault()
      const {response, error} = await login(
        data.username,
        data.password,
      );
     if(error){
       setPasswordEmailError("Email or password entered is incorrect")
     }
  };

  return (
    <>
      <Dialog.Title
        as="h3"
        className="text-4xl text-center my-8 font-medium leading-6 text-gray-900"
      >
        Login
      </Dialog.Title>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
        {errors && errors.username && (
          <span className="text-sm text-red">{errors && errors.username.message}</span>
        )}
        <input
          type="username"
          placeholder={`${"Username"} *`}
          name="username"
          className={`w-full border-2 ${errors && errors.username ? 'placeholder-red border-red focus:border-red' : 'border-gray500 focus:border-gray600'} py-2 px-4 outline-none mb-4`}
          {...register("username", { required: true })}
        />
        {errors && errors.password && (
          <span className="text-sm text-red">{errors && errors.password.message}</span>
        )}
        <input
          type="password"
          placeholder={`${"Password"} *`}
          name="password"
          className={`w-full border-2 ${errors && errors.password ? 'placeholder-red border-red focus:border-red' : 'border-gray500 focus:border-gray600'} py-2 px-4 outline-none mb-4`}
          {...register("password", { required: true })}
        />
        {errorMsg !== "" && (
          <div className="text-red text-sm mb-4 whitespace-nowrap">
            {errorMsg}
          </div>
        )}
        <div className="flex justify-between mb-4">
          <div className="flex items-center text-gray400 focus:outline-none">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="w-4 h-4 mb-0 mr-2"
            />
            <label htmlFor="remember" className="text-sm">
              {"Remember me"}
            </label>
          </div>
          <button
            onClick={onForgotPassword}
            className="text-gray400 text-sm hover:text-gray500 focus:outline-none focus:text-gray500"
          >
            Forgot password
          </button>
        </div>
        <div className="flex justify-between mb-4">
          <p className="text-red text-sm">{userEmailPasswordError && userEmailPasswordError}</p>
        </div>
        <Button
          type="submit"
          value={"Login"}
          extraClass="w-full text-center text-xl mb-4"
          size="lg"
        />
      </form>
      <SigninWithGoogle />
      <div className="text-center mt-2 mb-2 text-gray400">
        Not a member?{" "}
        <span
          onClick={onRegister}
          className="text-gray500 focus:outline-none focus:underline cursor-pointer"
        >
          {"Register"}
        </span>
      </div>
    </>
  );
};

export default Login;
