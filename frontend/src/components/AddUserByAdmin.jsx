import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "./Textbox";
import Loading from "./Loader";
import Button from "./Button";
import SelectList from "./SelectList";
import { useAddUserByadminMutation } from "../redux/slices/api/userApiSlice";

const AddUserByAdmin = ({ open, setOpen, userData }) => {
  let defaultValues = userData ?? {};
  const [admin,setAdmin] = useState(false);

  const isLoading = false,
    isUpdating = false;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });
  const [addUserByadmin] = useAddUserByadminMutation();
  const handelUserAdd=async(data)=>{
    try{
  const response = await addUserByadmin({...data,isAdmin:admin});
  console.log(response);
  setOpen(false);
    }catch(err){
  console.log(err);
    }
  }

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handelUserAdd)} className=''>
          <Dialog.Title
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4'
          >
            EDIT USER
          </Dialog.Title>
          <div className='mt-2 flex flex-col gap-2'>
          <div className="flex gap-6">
            <Textbox
              placeholder='First name'
              type='text'
              name='first_name'
              label='First Name'
              className='w-full rounded'
              required="true"
              register={register("first_name", {
                required: "first name is required!",
              })}
              error={errors.first_name ? errors.name.message : ""}
            />
            <Textbox
              placeholder='Last name'
              type='text'
              name='last_name'
              label='Last Name'
              className='w-full rounded'
              required='true'
              register={register("last_name", {
                required: "last name is required!",
              })}
              error={errors.last_name ? errors.name.message : ""}
            />
            </div>
            <Textbox
              placeholder='Title'
              type='text'
              name='title'
              label='Title'
              className='w-full rounded'
              register={register("title", {
                required: "Title is required!",
              })}
              error={errors.title ? errors.title.message : ""}
            />
            <Textbox
              placeholder='Email Address'
              type='email'
              name='email'
              label='Email Address'
              className='w-full rounded'
              required='true'
              register={register("email", {
                required: "Email Address is required!",
              })}
              error={errors.email ? errors.email.message : ""}
            />
                        <Textbox
              placeholder=' Password'
              type='password'
              name='password'
              label='Password '
              className='w-full rounded'
              required='true'
              register={register("password", {
                required: "Password  is required!",
              })}
              error={errors.password ? errors.password.message : ""}
            />
            <Textbox
              placeholder='Comfirm Password'
              type='password'
              name='comfirm-password'
              label='Comfirm Password '
              className='w-full rounded'
              required='true'
              register={register("comfirm-password", {
                required: "comfirm Password is required!",
              })}
              error={errors.comfirm ? errors.comfirm.message : ""}
            />
<SelectList label={'Administrator'} lists={['true','false']} selected={'false'} setSelected={setAdmin}/>
           
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
                label='submit'
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

export default AddUserByAdmin;
