import React, { useState } from "react";
import "../styles/TodoList.css";
import { Input } from "./Input";
import { addTask } from "../redux/pageReducer";
import { useDispatch } from "react-redux";
import { TiDelete } from "react-icons/ti";
import {
  removeTask,
  removeToDoList,
  toggleIsDone,
  filterActive,
  filterCompleted,
  filterAll,
  editTaskText,
  editTitleTodoList,
  dragDrobTasks,
} from "../redux/pageReducer";
import { MdDeleteOutline } from "react-icons/md";
import { EditableSpan } from "./EditableSpan";

export const TodoList = (props) => {
  const [firstIndex, setFirstIndex] = useState("");
  const dispatch = useDispatch();

  const handleSetTask = (value) => {
    dispatch(addTask({ todoListId: props.id, text: value }));
  };

  const handleRemoveToDoList = () => {
    dispatch(removeToDoList(props.id));
  };

  const handlerSetFilterActive = () => {
    dispatch(filterActive(props.id));
  };

  const handlerSetFilterCompleted = () => {
    dispatch(filterCompleted(props.id));
  };

  const handlerSetFilterAll = () => {
    dispatch(filterAll(props.id));
  };

  const getEditTodoListTitle = (title) => {
    dispatch(editTitleTodoList({ title, todoListId: props.id }));
  };

  return (
    <div className="todo-list">
      <button onClick={handleRemoveToDoList} className="button flex-button-el">
        <MdDeleteOutline />
      </button>
      <div className="title">
        <EditableSpan getValue={getEditTodoListTitle} text={props.title} />
      </div>
      <Input getValue={handleSetTask} />
      <div className="tasks">
        {props.tasks &&
          props.tasks.map((el, index) => (
            <Task
              todoListId={props.id}
              index={index}
              key={el.id}
              taskId={el.id}
              firstIndex={firstIndex}
              setFirstIndex={setFirstIndex}
              {...el}
            />
          ))}
      </div>
      <div className="sort-navigation">
        <button
          className={
            props.filter === "All" ? "button2 button_active" : "button2"
          }
          onClick={handlerSetFilterAll}
        >
          All
        </button>
        <button
          className={
            props.filter === "Active" ? "button2 button_active" : "button2"
          }
          onClick={handlerSetFilterActive}
        >
          Active
        </button>
        <button
          className={
            props.filter === "Completed" ? "button2 button_active" : "button2"
          }
          onClick={handlerSetFilterCompleted}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export const Task = (props) => {
  const dispatch = useDispatch();

  const handlerRemoveTask = () => {
    dispatch(
      removeTask({ todoListId: props.todoListId, taskId: props.taskId })
    );
  };
  const handleChange = (e) => {
    dispatch(
      toggleIsDone({
        todoListId: props.todoListId,
        taskId: props.taskId,
        isDone: e.currentTarget.checked,
      })
    );
  };

  const getEditTask = (text) => {
    dispatch(
      editTaskText({ todoListId: props.todoListId, taskId: props.taskId, text })
    );
  };

  //   Drag & Drop
  const dragStartHandler = (e, index) => {
    props.setFirstIndex(index);
    e.target.style.transform = "rotate(5deg)";
  };

  const dragEndHandler = (e) => {
    e.target.style.transform = "rotate(0)";
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
    e.target.style.transform = "rotate(5deg)";
  };

  const dropHandler = (e, index) => {
    e.preventDefault();
    e.target.style.transform = "rotate(0)";

    dispatch(
      dragDrobTasks({
        todoListId: props.todoListId,
        firstIndex: props.firstIndex,
        lastIndex: index,
      })
    );
  };
  return (
    <div
      draggable="true"
      onDragStart={(e) => dragStartHandler(e, props.index)}
      onDragLeave={(e) => dragEndHandler(e)}
      onDragEnd={(e) => dragEndHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => dropHandler(e, props.index)}
      className={props.isDone ? "task task_Done" : "task"}
    >
      <input type="checkbox" checked={props.isDone} onChange={handleChange} />
      <div className="text-task">
        <EditableSpan getValue={getEditTask} text={props.text} />
      </div>
      <button onClick={handlerRemoveTask} className="task-button">
        <TiDelete />
      </button>
    </div>
  );
};
