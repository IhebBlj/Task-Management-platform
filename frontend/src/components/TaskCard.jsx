import clsx from "clsx";
import React, { useState } from "react";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../utils";
import TaskDialog from "./task/TaskDialog";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import UserInfo from "./UserInfo";
import { IoMdAdd } from "react-icons/io";
import AddSubTask from "./task/AddSubTask";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const TaskCard = ({ task }) => {
  const completed =  task.subTasks.filter(task => task.stage === "COMPLETED").length;
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="w-full h-fit bg-[#0E443F] shadow-md p-4 rounded">
        <div className="w-full flex justify-between">
          <div
            className={clsx(
              "flex flex-1 gap-1 items-center text-sm font-medium",
              PRIOTITYSTYELS[task?.priority]
            )}
          >
            <span className="text-lg">{ICONS[task?.priority]}</span>
            <span className="uppercase">{task?.priority} Priority</span>
          </div>

          <TaskDialog task={task} />
        </div>

        <>
          <div className="flex items-center gap-2">
            <div
              className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
            />
            <h4 className="line-clamp-1 text-white">
              {task?.title}
            </h4>
          </div>
          <span className="text-sm text-gray-300">
            {formatDate(new Date(task?.date))}
          </span>
        </>

        <div className="w-full border-t border-gray-600 my-2" />
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
           
            <div className="flex gap-1 items-center text-sm text-gray-400">
              <FaList />
              <span>{completed}/{task?.subTasks?.length}</span> 
            </div>
          </div>

          <div className="flex flex-row-reverse">
            {task?.team?.map((m, index) => (
              <div
                key={index}
                className={clsx(
                  "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                  BGS[index % BGS?.length]
                )}
              >
                <UserInfo user={m} />
              </div>
            ))}
          </div>
        </div>


        <div className="w-full pb-2">
          <button
            onClick={() => setOpen(true)}
            
            className="w-full flex gap-4 items-center text-sm text-gray-400 font-semibold disabled:cursor-not-allowed disabled:text-gray-600"
          >
            <IoMdAdd className="text-lg" />
            <span>ADD TASK</span>
          </button>
        </div>
      </div>

      <AddSubTask open={open} setOpen={setOpen} Task={task} />
    </>
  );
};

export default TaskCard;