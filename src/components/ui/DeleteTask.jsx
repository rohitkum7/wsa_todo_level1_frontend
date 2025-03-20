import React, { useState } from "react";
import Modal from "./Modal";
import Info from "../../assets/info.svg";
import Cross from "../../assets/cross-icon.svg";
import clsx from "clsx";
import { useCallback } from "react";
import deleteTaskAPI from "../api/deleteTask";

export default function DeleteTask({ isOpen, onClose, task, fetchAllTasks }) {
  const [loading, setLoading] = useState(false);

  const handleResponse = useCallback(
    function () {
      fetchAllTasks();
      onClose();
    },
    [fetchAllTasks, onClose]
  );

  const handleError = useCallback(function (errMessage) {
    console.error(errMessage);
    alert(errMessage);
  }, []);

  const deleteTask = useCallback(
    function () {
      //Order of the parameters matter
      deleteTaskAPI(task._id, handleError, handleResponse, setLoading);
    },
    [handleResponse, handleError, task._id]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="delete-task-container">
        <div className="text-right delete-task-header">
          <img src={Info} alt="Info icon" className="delete-popup-info-icon" />
          <div className="close-modal-btn" onClick={onClose}>
            <img src={Cross} alt="Cross popup icon" />
          </div>
        </div>

        <div className="delete-popup-content">
          <p className="delete-task-text">
            Are you Sure You Want to delete <br />
            <span className="delete-task-title">{task.title}</span> ?
          </p>

          <div className="delete-action-btns">
            <button className="btn cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button
              className={clsx(
                "btn",
                "delete-btn",
                loading && "disable-delete-btn"
              )}
              onClick={deleteTask}
              disabled={loading}
            >
              {loading ? "Deleting" : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
