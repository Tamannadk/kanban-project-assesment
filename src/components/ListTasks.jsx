import React, { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

const ListTasks = ({ tasks, setTasks }) => {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [closed, setClosed] = useState([]);

  useEffect(() => {
    const fTodos = tasks.filter((task) => task.status === "todo");
    const fInProgress = tasks.filter((task) => task.status === "inprogress");
    const fClosed = tasks.filter((task) => task.status === "closed");
    setTodos(fTodos);
    setInProgress(fInProgress);
    setClosed(fClosed);
  }, [tasks]);

  const statuses = ["todo", "inprogress", "closed"];
  const statusLabels = {
    todo: { text: "Todo", bg: "bg-slate-500", sectionBg: "bg-slate-200" },
    inprogress: { text: "In Progress", bg: "bg-purple-500", sectionBg: "bg-purple-200" },
    closed: { text: "Closed", bg: "bg-green-500", sectionBg: "bg-green-200" },
  };

  return (
    <div className="flex gap-4 flex-wrap">
      {statuses.map((status, index) => {
        const tasksForStatus = tasks.filter((task) => task.status === status);
        return (
          <Section
            key={index}
            status={status}
            tasks={tasksForStatus}
            setTasks={setTasks}
            label={statusLabels[status]}
          />
        );
      })}
    </div>
  );
};

const Section = ({ status, tasks, setTasks, label }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addItemToSection = (id) => {
    setTasks((prev) => {
      const mTasks = prev.map((t) => {
        if (t.id === id) {
          return { ...t, status: status };
        }
        return t;
      });
      return mTasks;
    });
  };

  const [isAdding, setIsAdding] = useState(false);
  const [taskName, setTaskName] = useState("");

  const handleAddTask = () => {
    if (taskName.length < 3) {
      return toast.error("A task must have more than 3 characters");
    }
    const newTask = { id: uuidv4(), name: taskName, status };
    setTasks((prev) => {
      const updatedTasks = [...prev, newTask];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
    setTaskName("");
    setIsAdding(false);
  };

  return (
    <div ref={drop} className={`w-64 shadow-md rounded-lg overflow-hidden ${label.sectionBg} text-black ${isOver ? "bg-purple-500" : ""}`}>
      <Header text={label.text} bg={label.bg} count={tasks.length} />
      <div className="p-4 space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
          ))
        ) : (
          <p className="text-center text-gray-500">No tasks</p>
        )}
        {isAdding ? (
          <div className="flex flex-col space-y-2">
            <input
              className="border-2 border-slate-400 bg-slate-100 rounded-md px-2 py-1 text-black"
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Task name"
            />
            <button
              className="bg-green-500 rounded-md px-4 py-1 text-white"
              onClick={handleAddTask}
            >
              Add Task
            </button>
            <button
              className="text-red-500"
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className=" text-black text-left w-full py-2 rounded-md"
            onClick={() => setIsAdding(true)}
          >
            + Add Task
          </button>
        )}
      </div>
    </div>
  );
};

const Header = ({ text, bg, count }) => {
  return (
    <div className={`${bg} flex items-center justify-between h-12 px-4 text-white`}>
      <span className="uppercase text-sm">{text}</span>
      <div className="bg-white w-6 h-6 text-black rounded-full flex items-center justify-center">
        {count}
      </div>
    </div>
  );
};

const Task = ({ task, tasks, setTasks }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

//   const handleRemove = (id) => {
//     const filteredTasks = tasks.filter((t) => t.id !== id);
//     localStorage.setItem("tasks", JSON.stringify(filteredTasks));
//     setTasks(filteredTasks);
//   };

  const handleRemove = (id) => {
    setTasks((prev) => {
      const filteredTasks = prev.filter((t) => t.id !== id);
      localStorage.setItem("tasks", JSON.stringify(filteredTasks));
      return filteredTasks;
    });
  };

  return (
    <div ref={drag} className={`bg-white p-4 shadow-md rounded-md relative cursor-grab ${isDragging ? "opacity-25" : "opacity-100"}`}>
      <p>{task.name}</p>
      <button
        className="absolute bottom-1 right-1 text-red-500"
        onClick={() => handleRemove(task.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
    </div>
  );
};

export default ListTasks;
