import { useState, useEffect } from 'react';

export const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [editedTodo, setEditedTodo] = useState(null);

  useEffect(() => {
    // Fetch todos from the API using fetch
    fetch('https://localhost:5001/api/todos')
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

  const addTodo = () => {
    // Send POST request to add new todo
    fetch('https://localhost:5001/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: newTodoText }),
    })
      .then(response => response.json())
      .then(newTodo => {
        setTodos([...todos, newTodo]);
        setNewTodoText('');
      })
      .catch(error => console.error('Error adding new todo:', error));
  };

  const deleteTodo = id => {
    // Send DELETE request to remove todo
    fetch(`https://localhost:5001/api/todos/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
      })
      .catch(error => console.error('Error deleting todo:', error));
  };

  const editTodo = todo => {
    // Set the todo to be edited in the state
    setEditedTodo({ ...todo }); // Make sure to create a new object to avoid mutation
  };

  const updateTodo = () => {
    if (editedTodo) {
      // Send PUT request to update edited todo
      fetch(`https://localhost:5001/api/todos/${editedTodo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: editedTodo.text }),
      })
        .then(response => {
          if (response.ok) {
            // Update the todo in the state
            setTodos(todos.map(todo => (todo.id === editedTodo.id ? editedTodo : todo)));
            setEditedTodo(null);
          } else {
            console.error('Failed to update todo');
          }
        })
        .catch(error => console.error('Error updating todo:', error));
    }
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          value={newTodoText}
          onChange={e => setNewTodoText(e.target.value)}
          placeholder="Enter new task"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {editedTodo && editedTodo.id === todo.id ? (
              // Render input field for editing
              <>
                <input
                  type="text"
                  value={editedTodo.text} // Bind the input value to editedTodo.text
                  onChange={e => setEditedTodo({ ...editedTodo, text: e.target.value })}
                />
                <button onClick={updateTodo}>Update</button>
              </>
            ) : (
              // Render task with Edit and Delete buttons
              <>
                {todo.text}
                <button onClick={() => editTodo(todo)}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};




