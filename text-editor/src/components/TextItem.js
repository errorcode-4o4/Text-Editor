// src/components/TextItem.js
import React, { useState } from 'react';

const TextItem = ({ text, font, color, size, top, left, onClick, draggable, editText, moveText }) => {
  const [editable, setEditable] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizing, setResizing] = useState(false);

  const containerStyle = {
    border: '2px solid #67a6ea',
    marginBottom: '10px', // Adjust margin as needed
  };

  const style = {
    fontFamily: font,
    color: color,
    fontSize: size,
    position: 'absolute',
    top: top,
    left: left,
    cursor: draggable ? 'move' : 'auto',
    border: '1px solid black',
    backgroundColor: 'white',
  };

  const handleDragStart = (e) => {
    if (draggable) {
      e.dataTransfer.setData('text/plain', '');
      e.dataTransfer.setDragImage(new Image(), 0, 0);
      onClick();
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleResizeStart = (e) => {
    if (draggable) {
      setResizing(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleDrag = (e) => {
    if (draggable && !resizing) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      setDragStart({ x: e.clientX, y: e.clientY });
      moveText(deltaY, deltaX); // <-- Pass moveText function here
    }
  };

  const handleResize = (e, direction) => {
    if (resizing) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      setDragStart({ x: e.clientX, y: e.clientY });
      if (direction === 'right') {
        moveText(0, deltaX); // <-- Pass moveText function here
      } else if (direction === 'bottom') {
        moveText(deltaY, 0); // <-- Pass moveText function here
      } else if (direction === 'bottom-right') {
        moveText(deltaY, deltaX); // <-- Pass moveText function here
      }
    }
  };

  const handleDoubleClick = () => {
    setEditable(true);
  };

  const handleBlur = () => {
    setEditable(false);
    editText(editedText);
  };

  const handleChange = (e) => {
    setEditedText(e.target.value);
  };

  return (
    <div
      style={style}
      draggable={draggable}
      onClick={onClick}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDoubleClick={handleDoubleClick}
      onBlur={handleBlur}
    >
      {editable ? (
        <textarea type="text" placeholder='Text here' value={editedText} onChange={handleChange} className="text-item-input" />
      ) : (
        <span>{text}</span>
      )}
      <div
        className="resizer right"
        onMouseDown={(e) => handleResizeStart(e, 'right')}
      />
      <div
        className="resizer bottom"
        onMouseDown={(e) => handleResizeStart(e, 'bottom')}
      />
      <div
        className="resizer bottom-right"
        onMouseDown={(e) => handleResizeStart(e, 'bottom-right')}
      />
    </div>
  );
};

export default TextItem;
