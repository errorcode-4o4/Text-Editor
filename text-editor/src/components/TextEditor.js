// src/components/TextEditor.js
import React, { useState, useRef } from 'react';
import TextItem from './TextItem';
import Toolbar from './Toolbar';
import Header from './Header';
import './TextEditor.css';

const TextEditor = () => {
  const [textItems, setTextItems] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const undoStackRef = useRef([]);
  const redoStackRef = useRef([]);

  const addText = () => {
    const newItem = {
      text: 'Your Text Here',
      font: 'Arial',
      color: '#000000',
      size: 40,
      top: textItems.length > 0 ? textItems[textItems.length - 1].top + 50 : 100, // Adjust the offset as needed
      left: 100,
    };
  
    setTextItems((prevItems) => [...prevItems, newItem]);
    undoStackRef.current.push([...textItems]);
  };
  

  const editText = (newText) => {
    if (selectedItemIndex !== null) {
      setTextItems((prevItems) =>
        prevItems.map((item, index) =>
          index === selectedItemIndex ? { ...item, text: newText } : item
        )
      );
      undoStackRef.current.push([...textItems]);
    }
  };

  const moveText = (deltaY, deltaX) => {
    if (selectedItemIndex !== null) {
      setTextItems((prevItems) =>
        prevItems.map((item, index) =>
          index === selectedItemIndex
            ? { ...item, top: item.top + deltaY, left: item.left + deltaX }
            : item
        )
      );
      undoStackRef.current.push([...textItems]);
    }
  };

  const changeFont = (font) => {
    if (selectedItemIndex !== null) {
      setTextItems((prevItems) =>
        prevItems.map((item, index) =>
          index === selectedItemIndex ? { ...item, font: font } : item
        )
      );
      undoStackRef.current.push([...textItems]);
    }
  };

  const changeColor = (color) => {
    if (selectedItemIndex !== null) {
      setTextItems((prevItems) =>
        prevItems.map((item, index) =>
          index === selectedItemIndex ? { ...item, color: color } : item
        )
      );
      undoStackRef.current.push([...textItems]);
    }
  };

  const changeSize = (size) => {
    if (selectedItemIndex !== null) {
      setTextItems((prevItems) =>
        prevItems.map((item, index) =>
          index === selectedItemIndex ? { ...item, size: size } : item
        )
      );
      undoStackRef.current.push([...textItems]);
    }
  };

  const undo = () => {
    if (undoStackRef.current.length > 1) {
      redoStackRef.current.push([...textItems]);
      const prevState = undoStackRef.current.pop();
      setTextItems(prevState);
    }
  };

  const redo = () => {
    if (redoStackRef.current.length > 0) {
      const nextState = redoStackRef.current.pop();
      setTextItems(nextState);
      undoStackRef.current.push([...nextState]);
    }
  };
  return (
    <div>
      <Header />
      <div className="text-editor-container">
        <div className="text-section">
          {textItems.map((item, index) => (
            <TextItem
              key={index}
              {...item}
              onClick={() => setSelectedItemIndex(index)}
              draggable={index === selectedItemIndex}
              editText={editText}
              moveText={moveText}
            />
          ))}
        </div>
        <div className="toolbar-section">
          <Toolbar
            addText={addText}
            editText={editText}
            changeFont={changeFont}
            changeColor={changeColor}
            changeSize={changeSize}
            moveText={moveText}
            undo={undo}
            redo={redo}
          />
        </div>
      </div>
    </div>
  );
};

export default TextEditor;