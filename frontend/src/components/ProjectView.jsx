import React from "react";
import SubCard from "./SubCard";

const ProjectView = ({ tasks }) => {

    const todoTasks = tasks?.filter((task) => task.stage === "TODO");
    const inProgressTasks = tasks?.filter((task) => task.stage === "IN PROGRESS");
    const completedTasks = tasks?.filter((task) => task.stage === "COMPLETED");
    return (tasks?.length>0 ?(
      <div className="w-full py-4 flex gap-4">
        <div className="w-full">
          <div className="grid grid-cols-1 gap-4">
            {todoTasks.map((task, index) => (
              <SubCard task={task} key={index} />
            ))}
          </div>
        </div>
        <div className="w-full">
          <div className="grid grid-cols-1 gap-4">
            {inProgressTasks.map((task, index) => (
              <SubCard task={task} key={index} />
            ))}
          </div>
        </div>
        <div className="w-full">
          <div className="grid grid-cols-1 gap-4">
            {completedTasks.map((task, index) => (
              <SubCard task={task} key={index} />
            ))}
          </div>
        </div>
      </div>):(<p>No tasks created yet !</p>)
    );

  };


export default ProjectView;