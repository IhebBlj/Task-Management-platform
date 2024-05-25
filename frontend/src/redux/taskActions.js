export const updateTaskType = (taskId, newType) => {
    return {
      type: 'UPDATE_TASK_TYPE',
      payload: {
        taskId,
        newType
      }
    };
  };
  