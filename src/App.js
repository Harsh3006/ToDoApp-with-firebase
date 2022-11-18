import React, { useEffect, useState } from "react";
import "./App.css";
import AddTaskForm from "./components/AddTaskForm";
import UpdateTaskForm from "./components/UpdateTaskForm";
import ToDo from "./components/ToDo";
import Account from "./components/Account";
import { Routes, Route, useNavigate } from "react-router-dom";
import { auth, db } from "./Firebase";
import { signOut } from "firebase/auth";
import { onValue, ref, remove, set, update } from "firebase/database";
import { uid } from "uid";

function App() {
  const navigate = useNavigate();  
  const [newTask, setNewTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [updateTask, setUpdateTask] = useState("");
  const [countComplete, setCountComplete] = useState(0);

  useEffect(() =>{
    auth.onAuthStateChanged((user) =>{
      if(user){
        navigate('/todos');
        onValue(ref(db, `/${auth.currentUser.uid}`), snapshot => {
          setTodos([]);
          const data = snapshot.val();
          let count = 0;
          if(data !== null){
            Object.values(data).map(todo =>{
              setTodos((oldData) => [...oldData, todo])
              if(todo.completed){
                count += 1;
              }
              return todo
            })
          }
          setCountComplete(count);
        })
      }
      else{
        navigate('/');
      }
    })
  }, [navigate])
  
  const handleSignOut = ()  =>{
    signOut(auth).then(() =>{
      navigate('/');
    }).catch((error) =>{
      alert(error.message);
    })
  }

  // Add Task
  const addTaskHandler = () => {
    if (newTask) {
      let num = todos.length;
      const Uid = uid();
      set(ref(db, `/${auth.currentUser.uid}/${Uid}`),{
        index: num,
        id: Uid,
        title: newTask,
        completed: false
      })
      setNewTask("");
    }
  };

  // Delete Task
  const deleteTaskHandler = (id) => {
    remove(ref(db, `/${auth.currentUser.uid}/${id}`));
  };

  // Mark as done
  const markDoneHandler = (task) => {
    update(ref(db, `/${auth.currentUser.uid}/${task.id}`),{
      completed: !task.completed
    })
  };

  // Cancel Update
  const cancelUpdateHandler = () => {
    setUpdateTask("");
  };

  // Change Task for Upadte
  const changeTaskHandler = (event) => {
    setUpdateTask({
      id: updateTask.id,
      title: event.target.value,
    });
  };

  // Upadte Task
  const updateTaskHandler = () => {
    update(ref(db, `/${auth.currentUser.uid}/${updateTask.id}`),{
      title: updateTask.title
    })
    setUpdateTask("");
  };

  // Clear All
  const clearAll = () => {
    remove(ref(db, `/${auth.currentUser.uid}`));
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Account />} />
        <Route
          path="/todos"
          element={
            <div className="container">
              <i className="fa-solid fa-arrow-right-from-bracket" onClick={handleSignOut}></i>
              <h1 className="text-center">Things To Do</h1>
              {todos && todos.length ? (
                <h2>Done: {countComplete}</h2>
              ) : (
                <p className="text-center">
                  Looks Like you're almost free today!
                </p>
              )}

              {updateTask && updateTask ? (
                <UpdateTaskForm
                  updateTask={updateTask}
                  changeTaskHandler={changeTaskHandler}
                  updateTaskHandler={updateTaskHandler}
                  cancelUpdateHandler={cancelUpdateHandler}
                />
              ) : (
                <AddTaskForm
                  todos={todos}
                  newTask={newTask}
                  setNewTask={setNewTask}
                  addTaskHandler={addTaskHandler}
                  clearAll={clearAll}
                />
              )}

              <ToDo
                todos={todos}
                markDoneHandler={markDoneHandler}
                setUpdateTask={setUpdateTask}
                deleteTaskHandler={deleteTaskHandler}
              />
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
