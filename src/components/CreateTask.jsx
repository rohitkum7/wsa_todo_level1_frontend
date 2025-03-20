import React, { useCallback, useState } from "react";
import UserIcon from "../assets/user-icon.png";
import InputField from "./ui/InputField";
import TitleImg from "../assets/title-placeholder-img.svg";
import Memo from "../assets/memo.svg";
import Calender from "../assets/calendar.svg";
import clsx from "clsx";
import createTaskAPI from "./api/createTask";

export default function CreateTask({ showTaskListScreen, fetchAllTasks }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState();

  //Loading state
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

  const validate = function (values) {
    const { taskTitle, taskDescription } = values;
    // check if atleast the first two feilds related to our task have truthy values or not
    if (taskTitle && taskDescription) {
      //valid
      return true;
    } else {
      //Invalid
      const errMessage = "Please fill out the title and description";
      console.error(errMessage);
      alert(errMessage);
      return false;
    }
  };

  const handleResponse = useCallback(
    function (responseData) {
      if (responseData.success) {
        console.log("handled Succesfully");
        fetchAllTasks();
      }
    },
    [fetchAllTasks]
  );

  const handleError = function (errorMsg) {
    alert(errorMsg);
    console.log(errorMsg);
  };

  const createNewTask = useCallback(
    function (values) {
      createTaskAPI(values, handleResponse, handleError, setLoading);
    },
    [handleResponse]
  );

  const handleAddTask = useCallback(
    function () {
      //created values
      const values = { taskTitle, taskDescription, taskDueDate };
      //validation
      const isValid = validate(values);
      if (isValid) {
        //create task
        createNewTask(values);
      }
    },
    [createNewTask, taskTitle, taskDescription, taskDueDate]
  );

  return (
    <div className="content-section create-task-section">
      <div className="create-task-card">
        <img src={UserIcon} width={263} />
        <h1 className="create-task-title-text">Craete New Task</h1>
        <InputField
          name="new-task-title"
          label="Title"
          type="text"
          value={taskTitle}
          onChange={handleTitleChange}
          inputImg={TitleImg}
          placeholder="Title"
        />
        <InputField
          name="new-task-description"
          label="Description"
          type="textarea"
          value={taskDescription}
          onChange={handleDescriptionChange}
          inputImg={Memo}
          placeholder="Description"
          className="input-margin"
        />
        <InputField
          name="new-task-due-date"
          label="Due Date"
          type="date"
          value={taskDueDate}
          onChange={handleDateChange}
          inputImg={Calender}
          placeholder="Due date"
          className="input-margin"
        />
        <div className="add-edit-task-btns">
          <button
            className={clsx("btn", "add-task-btn", "cursor-pointer")}
            disabled={loading}
            onClick={handleAddTask}
          >
            {loading ? "Adding Task" : "Add Task"}
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
