import React, { useState } from "react";
import Modal from "./ui/Modal";
import CheckedBlue from "../assets/blue-checked.svg";
import Cross from "../assets/cross-icon.svg";
import AlarmClock from "../assets/alarm-clock.svg";
import Edit from "../assets/edit.svg";
import Delete from "../assets/delete.svg";
import moment from "moment";
import DeleteTask from "./ui/DeleteTask";

export default function ViewTask({
  task,
  setActiveTask,
  fetchAllTasks,
  showEditTaskScreen,
  showTaskListScreen,
}) {
  const [showDeleteTaskPopup, setShowDeleteTaskPopup] = useState(false);

  const handleEditTask = function () {
    setActiveTask(task);
    showEditTaskScreen();
  };

  const openDeleteTaskPopup = () => setShowDeleteTaskPopup(true);
  const closeDeleteTaskPopup = () => setShowDeleteTaskPopup(false);

  return (
    <Modal isOpen={true}>
      <div className="flex justify-between view-task-header">
        <div className="flex">
          <span className="task-icon-wrapper">
            <img src={CheckedBlue} className="task-icon" alt="Task Icon" />
          </span>
          <h2 className="view-task-title">{task?.title}</h2>
        </div>
        <div className="close-modal-btn" onClick={showTaskListScreen}>
          <img src={Cross} alt="Close Popup icon" />
        </div>
      </div>

      <div className="flex">
        <pre className="view-task-description">{task?.description}</pre>
        <div className="view-task-right-section">
          {task?.due_date && (
            <div className="view-task-info-box">
              <p className="label-14">Due Date</p>
              <div className="flex date-container">
                <img src={AlarmClock} alt="Clock icon" />
                <p className="date-text">
                  {moment(task.due_date).format("DD MMM YYYY")}
                </p>
              </div>
            </div>
          )}

          <div
            className="view-task-info-box flex cursor-pointer"
            onClick={handleEditTask}
          >
            <img src={Edit} alt="Edit task icon" width={16} height={16} />
            <p className="label-12">Edit Task</p>
          </div>
          <div
            className="view-task-info-box flex cursor-pointer"
            onClick={openDeleteTaskPopup}
          >
            <img src={Delete} alt="Delete task icon" width={16} height={16} />
            <p className="label-12">Delete Task</p>
          </div>
        </div>
      </div>
      {showDeleteTaskPopup && (
        <DeleteTask
          isOpen={openDeleteTaskPopup}
          onClose={closeDeleteTaskPopup}
          task={task}
          fetchAllTasks={fetchAllTasks}
        />
      )}
    </Modal>
  );
}
