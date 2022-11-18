const UpdateTaskForm = ({
  updateTask,
  changeTaskHandler,
  updateTaskHandler,
  cancelUpdateHandler,
}) => {
  return (
    <>
      <div className="row flex">
        <div className="col">
          <input
            type="text"
            value={updateTask && updateTask.title}
            onChange={(e) => changeTaskHandler(e)}
            className="form-control form-control-lg"
          />
        </div>
        <div className="col-auto">
          <button onClick={updateTaskHandler}>
            Update
          </button>
        </div>
        <div className="col-auto">
          <button onClick={cancelUpdateHandler} className="cancel">
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateTaskForm;
