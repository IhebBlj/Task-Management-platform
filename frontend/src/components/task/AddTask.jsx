import React, { useEffect, useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import { useForm } from "react-hook-form";
import UserList from "./UserList";
import SelectList from "../SelectList";
import { BiImages } from "react-icons/bi";
import Button from "../Button";
import { useCreateProjectMutation, useUpdateProjectMutation } from "../../redux/slices/api/taskApiSlice";
import { useSelector } from "react-redux";

const PRIORIRY = ["HIGH", "MEDIUM", "LOW"];
const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORITIES = ["HIGH", "MEDIUM", "NORMAL", "LOW"];
const uploadedFileURLs = [];

const AddTask = ({ open, setOpen }) => {
  const task = "";
  const { user } = useSelector((state) => state.auth);
const [re,setRe] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const [team, setTeam] = useState(task?.team || []);
  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [priority, setPriority] = useState(
    task?.priority?.toUpperCase() || PRIORIRY[2]
  );
  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);


  const handleSelect = (e) => {
    setAssets(e.target.files);
  };
  
  useEffect(() => {
    if (task) {
      setTeam(task.team || []);
      setStage(task.stage?.toUpperCase() || LISTS[0]);
      setPriority(task.priority?.toUpperCase() || PRIORITIES[2]);
    } else {
      reset();
      setTeam([]);
      setStage(LISTS[0]);
      setPriority(PRIORITIES[2]);
    }
  }, [open, task, reset]);

  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

  const submitHandler = async (data) => {
    try {
      const newData = {
        ...data,
        team,
        stage,
        priority,
        userId: user._id
      };
      let result;
      if (task._id) {
        result = await updateProject({ ...newData, _id: task._id }).unwrap();
        setRe(2);
      } else {
        result = await createProject(newData).unwrap();
        setRe(2);
      }
      reset();
      console.log(result); 
      setOpen(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Dialog.Title
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4'
          >
            {task ? "UPDATE PROJECT" : "CREATE PROJECT"}
          </Dialog.Title>

          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder='Project Title'
              type='text'
              name='title'
              label='Project Title'
              className='w-full rounded'
              register={register("title", { required: "Title is required" })}
              error={errors.title ? errors.title.message : ""}
            />

            <UserList setTeam={setTeam} team={team} logic="Add members" />

            <div className='flex gap-4'>
              <SelectList
                label='Project Stage'
                lists={LISTS}
                selected={stage}
                setSelected={setStage}
              />

              <div className='w-full'>
                <Textbox
                  placeholder='Date'
                  type='date'
                  name='date'
                  label='Project Date'
                  className='w-full rounded'
                  register={register("date", {
                    required: "Date is required!",
                  })}
                  error={errors.date ? errors.date.message : ""}
                />
              </div>
            </div>

            <div className='flex gap-4'>
              <SelectList
                label='Priority Level'
                lists={PRIORIRY}
                selected={priority}
                setSelected={setPriority}
              />

              <div className='w-full flex items-center justify-center mt-4'>
                <label
                  className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4'
                  htmlFor='imgUpload'
                >
                  <input
                    type='file'
                    className='hidden'
                    id='imgUpload'
                    onChange={(e) => handleSelect(e)}
                    accept='.jpg, .png, .jpeg,.pdf,.pptx,.docx'
                    multiple={true}
                  />
                  <BiImages />
                  <span>Add Assets</span>
                </label>
              </div>
            </div>

            <div className='bg-white py-6 sm:flex sm:flex-row-reverse gap-4'>
              {uploading ? (
                <span className='text-sm py-2 text-red-500'>
                  Uploading assets
                </span>
              ) : (
                <Button
                  label='Submit'
                  type='submit'
                  className='bg-[#0C9E7B] px-8 text-sm font-semibold text-white   sm:w-auto'
                />
              )}

              <Button
                type='button'
                className='bg-white px-5 text-sm font-semibold hover:bg-gray-100 text-gray-900 sm:w-auto'
                onClick={() => setOpen(false)}
                label='Cancel'
              />
            </div>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddTask;
