import React, { useCallback, useState } from "react";
import CheckedBlue from "../assets/blue-checked.svg";
import AlarmClock from "../assets/alarm-clock.svg";
import Edit from "../assets/edit.svg";
import Delete from "../assets/delete.svg";
import moment from "moment";
import DeleteTask from "./ui/DeleteTask";

export default function TaskTile({
  fetchAllTasks,
  setActiveTask,
  showEditTaskScreen,
  onClick,
  task,
}) {
  const [showDeleteTaskPopup, setShowDeleteTaskPopup] = useState(false);

  const handleEditTask = useCallback(
    function (event) {
      //In this case, parent element that is task-tile-container have an onCkick propert and also child element(edit-container) onClick Property. Because of the event bubbling, when we click on the edit button, it open the viewTaskScreen. Which can be stopped using e.stopPropagation
      event.stopPropagation();
      setActiveTask(task);
      showEditTaskScreen();
    },
    [setActiveTask, showEditTaskScreen, task]
  );

  function handleDeleteTask(e) {
    e.stopPropagation();
    setShowDeleteTaskPopup(true);
  }

  function closeDeleteTaskPopup() {
    setShowDeleteTaskPopup(false);
  }

  return (
    <>
      <div className="task-tile-container cursor-pointer" onClick={onClick}>
        <span className="task-icon-wrapper">
          <img src={CheckedBlue} className="task-icon" alt="Task icon" />
        </span>
        <div className=" task-text-wrapper">
          <p className="task-primary-text">{task?.title}</p>
          <p className="task-secondary-text">{task?.description}</p>
        </div>
        <div className="action-items-container">
          {task?.due_date && (
            <div className="flex date-container">
              <img src={AlarmClock} alt="clock-icon" />
              <p className="date-text">
                {moment(task.due_date).format("DD MMM YYYY")}
              </p>
            </div>
          )}

          <div
            className="edit-container cursor-pointer"
            onClick={handleEditTask}
          >
            <img src={Edit} alt="Edit task icon" />
          </div>

          <div
            className="delete-container cursor-pointer"
            onClick={handleDeleteTask}
          >
            <img src={Delete} alt="Delete Task Icon" />
          </div>
        </div>
      </div>
      <DeleteTask
        isOpen={showDeleteTaskPopup}
        onClose={closeDeleteTaskPopup}
        task={task}
        fetchAllTasks={fetchAllTasks}
      />
    </>
  );
}
