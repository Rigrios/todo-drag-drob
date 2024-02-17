import "./App.css";
import { useSelector } from "react-redux";
import { TodoList } from "./components/TodoList";
import { Input } from "./components/Input";

import { Header } from "./components/Header";

function App() {
  let todoList = useSelector((state) => state.page.todoList);
  let tasks = useSelector((state) => state.page.tasks);

  return (
    <div className="App">
      <Header />
      {todoList.map((el) => {
        let taskTodoList = tasks[el.id];

        if (el.filter === "Active") {
          taskTodoList = taskTodoList.filter((el) => el.isDone === false);
        }
        if (el.filter === "Completed") {
          taskTodoList = taskTodoList.filter((el) => el.isDone === true);
        }

        return (
          <TodoList
            key={el.id}
            id={el.id}
            tasks={taskTodoList}
            title={el.title}
            filter={el.filter}
          />
        );
      })}
    </div>
  );
}

export default App;
