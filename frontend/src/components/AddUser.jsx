import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "./Textbox";
import Loading from "./Loader";
import Button from "./Button";
import { useSendInviationMutation } from "../redux/slices/api/userApiSlice";
import axios from "axios";

const AddUser = ({ open, setOpen, userData }) => {
  let defaultValues = userData ?? {};
  const { user } = useSelector((state) => state.auth);
  const isLoading = false,
    isUpdating = false;



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

const [sendInvitation] = useSendInviationMutation();


  const handleOnSubmit = async(data) => {

try {
  const newData = {
    senderEmail: user.email,
    receiverEmail: data.email
  };
  const res = await axios.post(`http://localhost:${PORT}/api/user/send-invitation`, newData);
  setOpen(!open);
} catch (err) {
  console.error(err);
}
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
          <Dialog.Title
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4'
          >
            ADD A MEMBER
          </Dialog.Title>
          <div className='mt-2 flex flex-col gap-6'>
       
            <Textbox
              placeholder='Email Address'
              type='email'
              name='email'
              label='Email Address'
              className='w-full rounded'
              register={register("email", {
                required: "Email Address is required!",
              })}
              error={errors.email ? errors.email.message : ""}
            />
          </div>
          {isLoading || isUpdating ? (
            <div className='py-5'>
              <Loading />
            </div>
          ) : (
            <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
              <Button
                type='submit'
                className='bg-[#0C9E7B] px-8 text-sm font-semibold text-white  sm:w-auto'
                label='Add'
              />

              <Button
                type='button'
                className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                onClick={() => setOpen(false)}
                label='Cancel'
              />
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddUser;
