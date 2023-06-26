"use client"
import { Dialog } from "@headlessui/react";
import Button from "../Buttons/Button";
import { useForm } from "react-hook-form";
import { pb } from "@/app/pocketbase";
import { zodResolver } from '@hookform/resolvers/zod'
import { registerschema } from "@/components/Auth/schemavalidation";
import { useState } from "react";
import ConfirmEmail  from "@/components/emails/confirmemail";

const Register = ({
  onLogin,
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(registerschema) });
  const [usernameError, setUsernameError] = useState()
  const [emailError, setEmailError] = useState()
  const [success, setSuccess] = useState()


  const onSubmit = async (data, e) => {
    e.preventDefault()
    const details = {
      username: data.username,
      email: data.email,
      emailVisibility: true,
      password: data.password,
      passwordConfirm: data.passwordconfirm,
      name: data.name,
      phone: data.phone
    }
    try {
      const createAccount = await pb.collection('users').create(details)
      createAccount && pb.collection('users').requestVerification(details.email);
      createAccount && setSuccess("Your Account was created successfully")
      createAccount && setTimeout(() => {
        onLogin()
      }, 3000)
    } catch (err) {
      if (err.data.data.email.message) {
        setEmailError(err.data.data.email.message)
      }
      else
        setEmailError(null)

      if (err.data.data.username.message)
        setUsernameError(err.data.data.username.message)
      else
        setUsernameError(null)
    }
  };

  return (
    <>
      <Dialog.Title
        as="h3"
        className="text-4xl text-center my-8 font-medium leading-6 text-gray-900"
      >
        {"Register"}
      </Dialog.Title>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-2 relative">
        {errors && errors.username && (
          <span className="text-sm text-red">{errors && errors.username.message}</span>
        )}
        {usernameError && usernameError && (
          <span className="text-sm text-red">{usernameError && usernameError}</span>
        )}
        <input
          type="username"
          placeholder={`${"Username"} *`}
          name="username"
          className={`w-full border-2 ${errors && errors.username ? 'placeholder-red border-red focus:border-red' : 'border-gray500 focus:border-gray600'} py-2 px-4 outline-none mb-4`}
          {...register("username", { required: true })}
        />
        {errors && errors.email && (
          <span className="text-sm text-red">{errors && errors.email.message}</span>
        )}
        {emailError && emailError && (
          <span className="text-sm text-red">{emailError && emailError}</span>
        )}
        <input
          type="text"
          placeholder={`${"Email address"} *`}
          name="email"
          className={`w-full border-2 ${errors && errors.email ? 'placeholder-red border-red focus:border-red' : 'border-gray500 focus:border-gray600'} py-2 px-4 outline-none mb-4`}
          {...register("email", { required: true })}
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
        {errors && errors.passwordconfirm && (
          <span className="text-sm text-red">{errors && errors.passwordconfirm.message}</span>
        )}
        <input
          type="password"
          placeholder={`${"Confirm password"} *`}
          name="passwordconfirm"
          className={`w-full border-2 ${errors && errors.passwordconfirm ? 'placeholder-red border-red focus:border-red' : 'border-gray500 focus:border-gray600'} py-2 px-4 outline-none mb-4`}
          {...register("passwordconfirm", { required: true })}
        />
        {errors && errors.name && (
          <span className="text-sm text-red">{errors && errors.name.message}</span>
        )}
        <input
          type="text"
          placeholder={`${"Full Names"}`}
          name="name"
          className={`w-full border-2 ${errors && errors.name ? 'placeholder-red border-red focus:border-red' : 'border-gray500 focus:border-gray600'} py-2 px-4 outline-none mb-4`}
          {...register("name", { required: true })}
        />
        {errors && errors.phone && (
          <span className="text-sm text-red">{errors && errors.phone.message}</span>
        )}
        <input
          type="text"
          placeholder={`${"Phone number"}`}
          name="phone"
          className={`w-full border-2 ${errors && errors.phone ? 'placeholder-red border-red focus:border-red' : 'border-gray500 focus:border-gray600'} py-2 px-4 outline-none mb-4`}
          {...register("phone", { required: true })}
        />
        <div className="flex justify-between mb-4">
          <p className="text-green500 text-sm">{success && success}</p>
        </div>
        <Button
          type="submit"
          value={"Register"}
          extraClass="w-full text-center text-xl mb-4"
          size="lg"
        />
        <div className="text-center text-gray400">
          {"Already a member"}{" "}
          <span
            onClick={onLogin}
            className="text-gray500 focus:outline-none focus:underline cursor-pointer"
          >
            {"Login"}
          </span>
        </div>
      </form>
    </>
  );
};

export default Register;
