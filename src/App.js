import React, { useState } from "react";
import { todos as todosList } from "./todos";
import {
  Switch,
  Route,
  NavLink
} from "react-router-dom"
import { v4 as uuid } from "uuid"
import TodoList from "./components/TodoList/TodoList"

function App() {

  const [todos, setTodos] = useState(todosList)
  const [inputText, setInputText] = useState("")

  const handleAddToDo = (event) => {
    if (event.which === 13) {
      const newId = uuid()
      const newTodo = {
        "userId": 1,
        "id": newId,
        "title": inputText,
        "completed": false
      }
      const newTodos = {
        ...todos
      }
      newTodos[newId] = newTodo
      setTodos(newTodos)
      setInputText("")
    }
  }

  const handleToggle = (id) => {
    const newTodos = { ...todos }
    newTodos[id].completed = !newTodos[id].completed
    setTodos(newTodos)
  }

  const handleDeleteTodo = (id) => {
    const newTodos = { ...todos }
    delete newTodos[id]
    setTodos(newTodos)
  }

  const handleClearCompletedToDos = () => {
    const newTodos = { ...todos }
    for (const todo in newTodos) {
      if (newTodos[todo].completed) {
        delete newTodos[todo]
      }
    }
    setTodos(newTodos)
  }

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <input
          onChange={(event) => setInputText(event.target.value)}
          onKeyDown={(event) => handleAddToDo(event)}
          className="new-todo"
          value={inputText}
          placeholder="What needs to be done?"
          autoFocus />
      </header>
      <Switch>
        <Route exact path="/">
          <TodoList
            todos={Object.values(todos)}
            handleToggle={handleToggle}
            handleDeleteTodo={handleDeleteTodo}
          />
        </Route>
        <Route path="/active">
          <TodoList 
            todos={Object.values(todos).filter(todo =>
              !todo.completed
            )}
            handleToggle={handleToggle}
            handleDeleteTodo={handleDeleteTodo}
          />
        </Route>
        <Route path="/completed">
          <TodoList 
              todos={Object.values(todos).filter(todo =>
                todo.completed
              )}
              handleToggle={handleToggle}
              handleDeleteTodo={handleDeleteTodo}
            />
        </Route>
      </Switch>
      <footer className="footer">
        {/* <!-- This should be `0 items left` by default --> */}
        <span className="todo-count">
          <strong>0</strong> item(s) left
        </span>
        <ul className="filters">
          <li>
            <NavLink 
              exact to="/"
              activeClassName="selected">
                All
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/active"
              activeClassName="selected"
              >
                Active
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/completed"
              activeClassName="selected"
              >
                Completed
            </NavLink>
          </li>
        </ul>
        <button className="clear-completed">Clear completed</button>
      </footer>
    </section>
  );
}

export default App;
