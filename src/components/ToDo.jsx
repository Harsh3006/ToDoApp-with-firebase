import React from "react";

const ToDo = ({ todos, markDoneHandler, setUpdateTask, deleteTaskHandler }) => {
  return (
    <>
      {todos &&
        todos
          .sort((a, b) => (a.index > b.index ? 1 : -1))
          .map((task, index) => {
            return (
              <React.Fragment key={task.id}>
                <div className="col tasks">
                  <div className={task.completed ? "done" : ""}>
                    <span className="taskNumber flex">{index + 1}</span>
                    <span className="taskText">{task.title}</span>
                  </div>
                  <div className="iconsWrap">
                    <span
                      title="Completed / Not Completed"
                      onClick={(e) => markDoneHandler(task)}
                    >
                      <i className="fa-solid fa-circle-check"></i>
                    </span>

                    {task.completed ? null : (
                      <span
                        title="Edit"
                        onClick={() =>
                          setUpdateTask({
                            id: task.id,
                            title: task.title,
                            completed: task.completed ? true : false,
                          })
                        }
                      >
                        <i className="fa-solid fa-pen"></i>
                      </span>
                    )}

                    <span title="Delete" onClick={() => deleteTaskHandler(task.id)}>
                    <i className="fa-solid fa-trash-can"></i>
                    </span>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
    </>
  );
};

export default ToDo;
