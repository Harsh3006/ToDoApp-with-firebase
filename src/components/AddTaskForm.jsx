const AddTaskForm = ({ todos, newTask, setNewTask, addTaskHandler, clearAll }) => {
  return (
    <>
      <div className="row flex">
        <div className="col">
          <input
            type="text"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            required
          />
        </div>
        <div className="col-auto">
          <button onClick={addTaskHandler}>
            Add Task
          </button>
        </div>
        {todos && todos.length ? (
          <div className="col-auto">
            <button onClick={clearAll}>
              Clear All
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default AddTaskForm;
