import { useState } from "react";
import { Input } from "./Input";
import "../styles/Header.css";
import { useDispatch } from "react-redux";
import { addTodoList } from "../redux/pageReducer";

export const Header = () => {
  const dispatch = useDispatch();
  const getValue = (value) => {
    dispatch(addTodoList(value));
  };

  return (
    <div className="header">
      <div className="container">
        <div className="header__body">
          <h1>Create To Do List</h1>
          <Input getValue={getValue} />
          <h3>name </h3>
        </div>
      </div>
    </div>
  );
};
