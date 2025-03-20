import React, { useCallback, useEffect, useState } from "react";
import NoTask from "./NoTask";
import CreateTask from "./CreateTask";
import EditTask from "./EditTask";
import TaskList from "./TaskList";
import ViewTask from "./ViewTask";
import DeleteTask from "./ui/DeleteTask";
import Loading from "./ui/Loading";
import fetchTaskAPI from "./api/fetchTasks";

export default function TaskMain() {
  //We manage current screen/routing through state in a single page application
  const [currComponent, setCurrComponent] = useState("loading");
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState();

  const showNoTaskScreen = useCallback(function () {
    setCurrComponent("noTask");
  }, []);

  const showTaskListScreen = useCallback(function () {
    setCurrComponent("taskList");
  }, []);

  const showCreateTaskScreen = useCallback(function () {
    setCurrComponent("createTask");
  }, []);

  const showEditTaskScreen = function () {
    setCurrComponent("editTask");
  };

  const showViewTaskScreen = function () {
    setCurrComponent("viewTask");
  };

  const handleResponse = useCallback(
    function (responseData) {
      const extractedTasks = responseData.tasks;
      setTasks(extractedTasks);

      if (extractedTasks.length) {
        showTaskListScreen();
      } else {
        showNoTaskScreen();
      }
    },
    [showTaskListScreen, showNoTaskScreen]
  );

  function handleError(errorMessage) {
    alert(errorMessage);
    console.error(errorMessage);
  }

  const fetchAllTasks = useCallback(
    function () {
      fetchTaskAPI(handleResponse, handleError);
    },
    [handleResponse]
  );

  //Intial Effect

  useEffect(() => {
    fetchAllTasks();
  }, [fetchAllTasks]);

  return (
    <>
      {currComponent === "loading" && <Loading />}

      <div id="container-div">
        {currComponent === "noTask" && (
          <NoTask showCreateTaskScreen={showCreateTaskScreen} />
        )}
        {currComponent === "taskList" && (
          <TaskList
            tasks={tasks}
            fetchAllTasks={fetchAllTasks}
            showViewTaskScreen={showViewTaskScreen}
            showEditTaskScreen={showEditTaskScreen}
            showCreateTaskScreen={showCreateTaskScreen}
            setActiveTask={setActiveTask}
          />
        )}
        {currComponent === "createTask" && (
          <CreateTask
            showTaskListScreen={showTaskListScreen}
            fetchAllTasks={fetchAllTasks}
          />
        )}
        {currComponent === "viewTask" && (
          <ViewTask
            task={activeTask}
            setActiveTask={setActiveTask}
            fetchAllTasks={fetchAllTasks}
            showEditTaskScreen={showEditTaskScreen}
            showTaskListScreen={showTaskListScreen}
          />
        )}
        {currComponent === "editTask" && (
          <EditTask
            task={activeTask}
            fetchAllTasks={fetchAllTasks}
            showTaskListScreen={showTaskListScreen}
          />
        )}
      </div>
    </>
  );
}
