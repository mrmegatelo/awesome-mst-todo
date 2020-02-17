import React, { useLayoutEffect, useRef } from 'react';

const ItemNameInput = ({ id, name, height, toggleEdit, editItem }) => {
  const textareaRef = useRef(null);
  const handleKeyDown = (e) => {
    const {value} = e.target;
    if(value && e.key === 'Enter'){
      toggleEdit();
      editItem(id, value)
    }
  };

  const handleBlur = (e) => {
    const {value} = e.target;
    toggleEdit();
    editItem(id, value)
  };

  useLayoutEffect(() => {
    textareaRef.current.focus();
  }, []);

  return (
    <div className="item-name-input" style={{height: `${height - 40}px`}} >
      <textarea
        ref={textareaRef}
        defaultValue={name}
        style={{height: `${height - 40}px`}}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
    </div>
  )
};

export default ItemNameInput;
