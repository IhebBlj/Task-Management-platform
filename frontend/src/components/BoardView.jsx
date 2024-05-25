import React from "react";
import { useLocation } from "react-router-dom";
import TaskCard from "./TaskCard";

const BoardView = ({ tasks }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const stageFilter = pathSegments[1];

  if (stageFilter === "tasks") {
    const todoTasks = tasks?.filter((task) => task.stage === "todo");
    const inProgressTasks = tasks?.filter((task) => task.stage === "in progress");
    const completedTasks = tasks?.filter((task) => task.stage === "completed");

    return (
      <div className="w-full py-4 flex gap-4">
        <div className="w-full">
          <div className="grid grid-cols-1 gap-4">
            {todoTasks?.map((task, index) => (
              <TaskCard task={task} key={index} />
            ))}
          </div>
        </div>
        <div className="w-full">
          <div className="grid grid-cols-1 gap-4">
            {inProgressTasks?.map((task, index) => (
              <TaskCard task={task} key={index} />
            ))}
          </div>
        </div>
        <div className="w-full">
          <div className="grid grid-cols-1 gap-4">
            {completedTasks?.map((task, index) => (
              <TaskCard task={task} key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    const filteredTasks = tasks?.filter((task) => {
      switch (stageFilter) {
        case "completed":
          return task.stage === "completed";
        case "todo":
          return task.stage === "todo";
        case "in-progress":
          return task.stage === "in progress";
        default:
          return true; 
      }
    });

    return (
      <div className="w-full py-4 flex gap-4">
        <div className="w-full">
          <div className="grid grid-cols-1 gap-4">
            {filteredTasks?.map((task, index) => (
              <TaskCard task={task} key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default BoardView;