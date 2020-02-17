import React, { useRef } from "react";

const AddItemInput = ({ addItem }) => {
  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    const {value} = e.target;
    if(value && e.key === 'Enter'){
      addItem(value);
      inputRef.current.value = '';
    }
  };

  return(
    <div id="add-item-input">
      <i className="fas fa-plus"/>
      <input
        ref={inputRef}
        type="text"
        placeholder="Add item"
        onKeyDown={handleKeyDown}
      />
    </div>
  )
};


export default AddItemInput;
