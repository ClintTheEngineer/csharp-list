import { useState, useEffect } from 'react';

export const Todo = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch todos from the API using fetch
    fetch('https://localhost:5001/api/todos') // This matches the route defined in TodoController
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setTodos(data);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }, []);

  return (
    <div>
      <h1>To-Do List</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
};


