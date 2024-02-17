import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import "../styles/Input.css";

export const Input = (props) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handlerKeyDown = (e) => {
    setError("");
    if (e.key === "Enter") {
      onClickHandler();
    }
  };

  const onClickHandler = () => {
    if (value === "") {
      setError("Input");
      return;
    }
    props.getValue(value);
    setValue("");
  };
  return (
    <div className="input-create-todo-list">
      <input
        value={value}
        onKeyDown={handlerKeyDown}
        onChange={(e) => setValue(e.currentTarget.value)}
        className={error !== "" ? "error" : ""}
      />
      <button onClick={onClickHandler} className="button">
        <IoIosAddCircle />
      </button>
    </div>
  );
};
