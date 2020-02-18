import React, { useLayoutEffect, useRef, FC, FocusEvent, KeyboardEvent } from 'react';
import isNull from 'lodash/isNull';

interface IItemNameInput {
  id: string,
  name: string,
  toggleEdit: () => void;
  editItem: (name: string) => void;
}

const ItemNameInput: FC<IItemNameInput> = ({ id, name, toggleEdit, editItem }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleKeyDown = (e: KeyboardEvent) => {
    const { value } = e.target as HTMLTextAreaElement;
    if(value && e.key === 'Enter'){
      toggleEdit();
      editItem(value)
    }
  };

  const handleBlur = (e: FocusEvent) => {
    const { value } = e.target as HTMLTextAreaElement;
    toggleEdit();
    editItem(value);
  };

  useLayoutEffect(() => {
    !isNull(textareaRef.current) && textareaRef.current.focus();
  }, []);

  return (
    <div className="item-name-input">
      <textarea
        ref={textareaRef}
        defaultValue={name}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
    </div>
  )
};

export default ItemNameInput;
