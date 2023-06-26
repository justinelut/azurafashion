"use client"

import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import Button from "@/components/Buttons/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordresetschema } from "@/components/Auth/schemavalidation";
import { pb } from "@/app/pocketbase";


const ForgotPassword = ({
  onLogin,
}) => {
  const [userEmailPasswordError, setPasswordEmailError] = useState("");
  const [userEmailPasswordSuccess, setPasswordEmailSuccess] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(passwordresetschema) });
 

  const onSubmit = async (data, e) => {
    e.preventDefault()
    try {
      const resetemail = await pb.collection('users').requestPasswordReset(data.email);
      resetemail && console.log(resetemail)
      setPasswordEmailSuccess(`Please check the email address ${data.email} with instructions on how to reset your password`)  
    } catch (err) {
      setPasswordEmailError("User account not found")
    }
  };

  return (
    <>
      <Dialog.Title
        as="h3"
        className="text-3xl text-center my-8 font-medium leading-10 text-gray-900"
      >
        {"Forgot password"}
      </Dialog.Title>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
        {errors && errors.email && (
          <span className="text-sm text-red">{errors && errors.email.message}</span>
        )}
        <input
          type="text"
          placeholder={`${"Email address"} *`}
          name="email"
          className={`w-full border-2 ${errors && errors.email ? 'placeholder-red border-red focus:border-red' : 'border-gray500 focus:border-gray600'} py-2 px-4 outline-none mb-4`}
          {...register("email", { required: true })}
        />
        <div className="flex justify-between mb-4">
          <p className="text-red text-sm">{userEmailPasswordError && userEmailPasswordError}</p>
        </div>
        <div className="flex justify-between mb-4">
          <p className="text-green500 text-sm">{userEmailPasswordSuccess && userEmailPasswordSuccess}</p>
        </div>
        <Button
          type="submit"
          value={"Submit"}
          extraClass="w-full text-center text-xl mb-4"
          size="lg"
        />
        <div className="text-center text-gray400">
          {"Go back to"}{" "}
          <button
            onClick={onLogin}
            className="text-gray500 focus:outline-none focus:underline cursor-pointer"
          >
            {"Login"}
          </button>
        </div>
      </form>
    </>
  );
};

export default ForgotPassword;
