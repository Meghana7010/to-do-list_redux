import { useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TODO_Action, REMOVE_TODO_Actions, EDIT_TODO_Action } from './actions/ToDoActions';

function App() {
  const [todo, setTodo] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  const dispatch = useDispatch();
  const Todo = useSelector((state) => state.todo);
  const { todos } = Todo;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Handle editing
      dispatch(EDIT_TODO_Action({ ...currentTodo, todo }));
      setIsEditing(false);
      setCurrentTodo(null);
    } else {
      // Handle adding new todo
      dispatch(ADD_TODO_Action(todo));
    }
    setTodo('');
  };

  const removeHandler = (t) => {
    dispatch(REMOVE_TODO_Actions(t));
  };

  const editHandler = (t) => {
    setIsEditing(true);
    setCurrentTodo(t);
    setTodo(t.todo);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Manage your To-Do List</h1>

        {/* Input Section */}
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Enter item'
            style={{
              width: 350,
              padding: 10,
              borderRadius: 20,
              border: "none",
              fontSize: 20,
            }}
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button type='submit'
            style={{
              padding: 12,
              borderRadius: 25,
              fontSize: 15,
              marginLeft: 20,
            }}>
            {isEditing ? 'Update' : 'Add'}
          </button>
        </form>

        {/* List Section */}
        <ul className='toDoList'>
          {todos && 
            todos.map((t) => (
              <li key={t.id} className='singleToDo'>
                <span className='firstToDo'>{t.todo}</span>
                <button style={{
                  borderRadius: 25, 
                  padding: 10,
                  border: '1px solid white',
                  color: 'white',
                  backgroundColor: 'orange',
                  marginRight: 10,  // Add margin to the right of the Edit button
                }}
                onClick={() => editHandler(t)}>Edit</button>
                <button style={{
                  borderRadius: 25, 
                  padding: 10,
                  border: '1px solid white',
                  color: 'white',
                  backgroundColor: 'orangered',
                }}
                onClick={() => removeHandler(t)}>Delete</button>
              </li>
            ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
