import clsx from "clsx";
import React, { useState } from "react";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../utils";

import UserInfo from "./UserInfo";
import SubDialog from "./task/SubDialog";
import { useDispatch } from "react-redux";
import { useUpdateSubtaskStageMutation } from "../redux/slices/api/taskApiSlice";
import { useParams } from "react-router-dom";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
  HIGH: <MdKeyboardDoubleArrowUp />,
  MEDIUM: <MdKeyboardArrowUp />,
  LOW: <MdKeyboardArrowDown />,
};

const SubCard = ({ task }) => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

const [updateSubtaskStage] = useUpdateSubtaskStageMutation();

  const handleTaskStatusChange = async(newStage) => {
try{
const response = await updateSubtaskStage({subTaskId:task._id,newStage:newStage,taskId:id},{ keepUnusedDataFor: 0 })
console.log(response);
} catch(err){
  console.log(err);
}
  };

  return (
    <>
      <div className="w-full h-fit bg-[#0D5C63] shadow-md p-4 rounded">
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

          {user && <SubDialog task={task} />}
        </div>

        <>
          <div className="flex items-center gap-2">
            <div
              className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
            />
            <h4 className="line-clamp-1 text-white">{task?.title}</h4>
          </div>
          <div>
            <h6 className="text-white text-xs">{task?.description}</h6>
          </div>
          <span className="text-sm text-gray-300">
            {formatDate(new Date(task?.date))}
          </span>
          
          <div className="flex flex-row-reverse">

          <div className="flex flex-row-reverse">
            {task?.assigned?.map((m, index) => (
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
            
        </>

        <div className="mt-2 flex gap-2">
          {task.stage === "TODO" && (
            <>
              <button
                onClick={() => handleTaskStatusChange("IN PROGRESS")}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded"
              >
                In Progress
              </button>
              <button
                onClick={() => handleTaskStatusChange("COMPLETED")}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded"
              >
                Completed
              </button>
            </>
          )}
          {task.stage === "IN PROGRESS" && (
            <button
              onClick={() => handleTaskStatusChange("COMPLETED")}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded"
            >
              Completed
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default SubCard;