import React, { useState } from "react";

import { useForm } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import Button from "../Button";
import SelectList from "../SelectList";
import UserList from "./UserList";
import { useUpdateSubTaskMutation } from "../../redux/slices/api/taskApiSlice";
const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
  const PRIORIRY = ["HIGH", "MEDIUM", "LOW"];


const EditSubTask = ({ open, setOpen, id }) => {
  const task = "";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [team, setTeam] = useState(task?.team || []);

  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [priority, setPriority] = useState(
    task?.priority?.toUpperCase() || PRIORIRY[2]
  );
  const [updateSubTask] = useUpdateSubTaskMutation();
  const handleOnSubmit = async (data) => {
    try {
      const payload = {
        title: data.title,
        description: data.description,
        date: data.date,
        stage: stage,
        priority: priority,
        assigned: team,
        subTaskId:id
      };
      const response = await updateSubTask(payload); 
      console.log(response); 
      alert('Subtask updated successfully!');
      setOpen(false);
    } catch (error) {
      console.error('Error updating subtask:', error);
      alert('Failed to update subtask');
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
            EDIT TASK
          </Dialog.Title>
          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder='Task title'
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
              placeholder='Task description'
              type='text'
              name='description'
              label='Description'
              className='w-full rounded'
              register={register("description", {
                required: "Description is required!",
              })}
              error={errors.description ? errors.description.message : ""}
            />
            </div>
            <div className='flex items-center gap-4'>
              <Textbox
                placeholder='Date'
                type='date'
                name='date'
                label='Task Date'
                className='w-full rounded'
                register={register("date", {
                  required: "Date is required!",
                })}
                error={errors.date ? errors.date.message : ""}
              />
              </div>
            <div className='flex gap-4'>
              <SelectList
                label='Project Stage'
                lists={LISTS}
                selected={stage}
                setSelected={setStage}
              />
            
            
          </div>
          <div className='flex gap-4'>
              <SelectList
                label='Priority Level'
                lists={PRIORIRY}
                selected={priority}
                setSelected={setPriority}
              />
              </div>
              <UserList setTeam={setTeam} team={team} logic="Assign task to :"/>
          <div className='py-3 mt-4 flex sm:flex-row-reverse gap-4'>
            <Button
              type='submit'
              className='bg-[#0C9E7B] text-sm font-semibold text-white sm:ml-3 sm:w-auto'
              label='Submit'
            />

            <Button
              type='button'
              className='bg-white border text-sm font-semibold hover:bg-gray-100 text-gray-900 sm:w-auto'
              onClick={() => setOpen(false)}
              label='Cancel'
            />
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default EditSubTask;
