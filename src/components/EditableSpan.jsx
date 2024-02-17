import { useState } from "react";
import "../styles/EditableSpan.css";

export const EditableSpan = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState("");

  const handleEditMode = () => {
    setEditMode(!editMode);
    setValue(props.text);
  };

  const handlerOnBlur = () => {
    setEditMode(!editMode);
    props.getValue(value);
  };

  const handleOnChange = (e) => {
    setValue(e.currentTarget.value);
  };
  return (
    <div className="editableSpan">
      {editMode ? (
        <input
          onBlur={handlerOnBlur}
          className="edit-input"
          value={value}
          onChange={handleOnChange}
          autoFocus
        />
      ) : (
        <span onDoubleClick={handleEditMode}>{props.text}</span>
      )}
    </div>
  );
};
