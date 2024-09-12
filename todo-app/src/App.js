// src/App.js
import React, { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Загрузка задач из локального хранилища при загрузке
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    // Сохранение задач в локальное хранилище при обновлении
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      if (editIndex !== null) {
        // Обновляем существующую задачу
        const updatedTodos = todos.map((todo, index) =>
          index === editIndex ? { ...todo, text: inputValue } : todo
        );
        setTodos(updatedTodos);
        setEditIndex(null);
      } else {
        // Добавляем новую задачу
        setTodos([...todos, { text: inputValue, completed: false }]);
      }
      setInputValue('');
    }
  };

  const handleEditTodo = (index) => {
    setInputValue(todos[index].text);
    setEditIndex(index);
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-800 via-pink-600 to-blue-500">
      <div className="bg-black bg-opacity-70 p-8 rounded-2xl shadow-xl max-w-md w-full">
        <h1 className="text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-pink-500 to-purple-600 animate-gradient">
          Task List
        </h1>
        <div className="flex items-center mb-6">
          <input
            type="text"
            className="flex-1 p-3 rounded-l-full border-none outline-none text-white bg-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-pink-500 transition duration-300"
            placeholder="Enter a new task..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            onClick={handleAddTodo}
            className="bg-pink-500 text-white p-3 rounded-r-full hover:bg-pink-400 transition duration-300"
          >
            {editIndex !== null ? 'Save' : '+'}
          </button>
        </div>
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`mx-2 px-4 py-2 rounded ${filter === 'all' ? 'bg-pink-500 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            All of them
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`mx-2 px-4 py-2 rounded ${filter === 'active' ? 'bg-pink-500 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
             Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`mx-2 px-4 py-2 rounded ${filter === 'completed' ? 'bg-pink-500 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            Completed
          </button>
        </div>
        <ul>
          {filteredTodos.map((todo, index) => (
            <li
              key={index}
              className={`flex justify-between items-center bg-gray-800 p-3 rounded mb-3 text-white transition-transform transform hover:scale-105 ${todo.completed ? 'line-through text-gray-400' : ''}`}
            >
              <span
                onClick={() => handleToggleComplete(index)}
                className="cursor-pointer"
              >
                {todo.text}
              </span>
              <div>
                <button
                  onClick={() => handleEditTodo(index)}
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-400 transition duration-300 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTodo(index)}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-400 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
