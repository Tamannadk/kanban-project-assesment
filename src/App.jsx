import React, { useState, useEffect } from 'react';
import CreateTask from './components/CreateTask';
import ListTasks from './components/ListTasks';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  return (
    <>
      <Navbar />
      <DndProvider backend={HTML5Backend}>
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 bg-slate-900 text-white p-3 overflow-auto">
            <ListTasks tasks={tasks} setTasks={setTasks} />
          </main>
        </div>
      </DndProvider>
    </>
  );
}

export default App;
