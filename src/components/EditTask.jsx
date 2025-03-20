import React, { useCallback, useState } from "react";
import EditTaskImg from "../assets/edit-task-logo.svg";
import InputField from "./ui/InputField";
import TitleImg from "../assets/title-placeholder-img.svg";
import Memo from "../assets/memo.svg";
import Calender from "../assets/calendar.svg";
import clsx from "clsx";
import updateTaskAPI from "./api/updateTask";

export default function EditTask({ task, fetchAllTasks, showTaskListScreen }) {
  //pre-filled input values

  const [taskTitle, setTaskTitle] = useState(task.title ?? "");
  const [taskDescription, setTaskDescription] = useState(
    task.description ?? ""
  );
  const [taskDueDate, setTaskDueDate] = useState(
    task.due_date ? new Date(task.due_date) : undefined
  );
  const [loading, setLoading] = useState(false);

  const handleTitleChange = function (e) {
    setTaskTitle(e.target.value);
  };
  const handleDescriptionChange = function (e) {
    setTaskDescription(e.target.value);
  };
  const handleDateChange = function (date) {
    setTaskDueDate(date);
  };

  //Validating the values

  const validate = function (values) {
    const { taskTitle, taskDescription } = values;
    if (taskTitle && taskDescription) {
      return true;
    } else {
      const errorMsg = "Please fill out the title and description";
      console.error(errorMsg);
      alert(errorMsg);
      return false;
    }
  };

  const handleResponse = useCallback(
    function (responseData) {
      if (responseData.success) {
        console.log("data fetched successfully");
        fetchAllTasks();
      }
    },
    [fetchAllTasks]
  );

  const handleError = function (errorMsg) {
    alert(errorMsg);
    console.error(errorMsg);
  };

  const editTask = useCallback(
    function (taskId, values) {
      updateTaskAPI(values, taskId, handleError, handleResponse, setLoading);
    },
    [handleResponse]
  );

  const handleEditTask = useCallback(
    function () {
      const values = {
        taskTitle,
        taskDescription,
        taskDueDate,
      };
      const isValid = validate(values);
      if (isValid) editTask(task._id, values);
    },
    [editTask, task._id, taskDescription, taskTitle, taskDueDate]
  );

  return (
    <div className="create-task-section">
      <div className="create-task-card">
        <img src={EditTaskImg} alt="Edit task icon" width={263} />
        <h1 className="create-task-title-text">Edit Task</h1>
        <InputField
          name="edit-task-title"
          value={taskTitle}
          label="Title"
          type="text"
          inputImg={TitleImg}
          placeholder="Title"
          onChange={handleTitleChange}
        />
        <InputField
          name="edit-task-description"
          value={taskDescription}
          label="Description"
          type="textarea"
          inputImg={Memo}
          placeholder="Description"
          className="input-margin"
          onChange={handleDescriptionChange}
        />
        <InputField
          name="edit-task-due-date"
          label="Due Date"
          value={taskDueDate}
          onChange={handleDateChange}
          type="date"
          inputImg={Calender}
          placeholder="Due Date"
          className="input-margin"
        />
        <div className="add-edit-task-btns">
          <button
            className={clsx(
              "btn",
              "edit-task-btn",
              loading ? "disabled-delete-btn" : "cursor-pointer"
            )}
            disabled={loading}
            onClick={handleEditTask}
          >
            Save
          </button>
          <button
            className="btn cancel-btn cursor-pointer"
            onClick={showTaskListScreen}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
