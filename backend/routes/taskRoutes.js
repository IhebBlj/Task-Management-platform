
const express = require('express');
const {
  createSubTask,
  createTask,
  dashboardStatistics,
  deleteRestoreTask,
  duplicateTask,
  getTask,
  getTasks,
  postTaskActivity,
  updateSubTask,
  updateTask,
  getAllSubTasks,
  updateSubTaskStage,
  deleteTask,
  deleteSubTask,
}=require( "../controllers/taskController.js");

const router = express.Router();

router.post("/create", createTask);
router.post("/duplicate/:id", duplicateTask);
router.post("/activity", postTaskActivity);
router.post("/:id/create-subtask",  createSubTask);

router.get("/dashboard",dashboardStatistics);
router.get("/:userId",  getTasks);
router.get("/:id", getTask);
router.get("/:id/subtasks", getAllSubTasks);

router.put("/update-subtask/:taskId/:subTaskId", updateSubTask);
router.put("/update", updateTask);
router.put("/subtasks/:subTaskId/update-stage",updateSubTaskStage);
router.put("/subtasks/:subTaskId/update",updateSubTask);

router.delete("/:taskId/delete",deleteTask);
router.delete("/delete-restore/:id?",deleteRestoreTask);
router.delete("/subtasks/:subTaskId/delete",deleteSubTask);

module.exports= router;
