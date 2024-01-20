// src/components/Toolbar.js
import React, { useState } from 'react';

const Toolbar = ({ addText, changeFont, changeColor, changeSize, moveText, undo, redo }) => {
  const [selectedFont, setSelectedFont] = useState('Arial');
  const [selectedColor, setSelectedColor] = useState('#67a6ea');
  const [selectedSize, setSelectedSize] = useState(16);

  const [enableDrag, setEnableDrag] = useState(true);
  const [enableResize, setEnableResize] = useState(true);

  const handleFontChange = (e) => {
    const font = e.target.value;
    setSelectedFont(font);
    changeFont(font);
  };

  const handleColorChange = (e) => {
    const color = e.target.value;
    setSelectedColor(color);
    changeColor(color);
  };

  const handleSizeChange = (e) => {
    const size = parseInt(e.target.value, 10);
    setSelectedSize(size);
    changeSize(size);
  };

  const handleMove = (direction) => {
    if (direction === 'up') moveText(-10, 0);
    else if (direction === 'down') moveText(10, 0);
    else if (direction === 'left') moveText(0, -10);
    else if (direction === 'right') moveText(0, 10);
  };

  const handleToggleDrag = () => {
    setEnableDrag((prev) => !prev);
  };

  const handleToggleResize = () => {
    setEnableResize((prev) => !prev);
  };

  return (
    <div  className="property">
       <label>
  Font:
  <select value={selectedFont} onChange={handleFontChange} className="font-select">
    <option value="Arial">Arial</option>
    <option value="Times New Roman">Times New Roman</option>
    <option value="Verdana">Verdana</option>
    <option value="Georgia">Georgia</option>
    <option value="Courier New">Courier New</option>
    <option value="Tahoma">Tahoma</option>
    <option value="Palatino">Palatino</option>
    <option value="Garamond">Garamond</option>
    <option value="Comic Sans MS">Comic Sans MS</option>
    <option value="Helvetica">Helvetica</option>
    <option value="Impact">Impact</option>
    <option value="Lucida Sans Unicode">Lucida Sans Unicode</option>
    <option value="Trebuchet MS">Trebuchet MS</option>
    <option value="Cursive">Cursive</option>
    <option value="Fantasy">Fantasy</option>
    <option value="Monospace">Monospace</option>
    <option value="Old English Text MT">Old English Text MT</option>
    <option value="Brush Script MT">Brush Script MT</option>
    <option value="Courier">Courier</option>
    {/* Add more font options as needed */}
  </select>
</label>


      <div className="fontcolor">
      <label>
     
        Size:
        <input
          type="number"
          value={selectedSize}
          onChange={handleSizeChange}
          min="1"
          max="100"
        />
      </label>
      <label>
      Color:
  <input type="color" value={selectedColor} onChange={handleColorChange} style={{ backgroundColor: '#67a6ea' }} />
      </label>
      </div>
     
     
      
      
      <button className="button" onClick={addText}>Add Text</button>
      
      
      <section className="movement--buttons">
      <button className="button" onClick={() => handleMove('up')}>Move Up</button>
      <button className="button" onClick={() => handleMove('down')}>Move Down</button>
      <button className="button" onClick={() => handleMove('left')}>Move Left</button>
      <button className="button" onClick={() => handleMove('right')}>Move Right</button>
      </section>
       <section className="undo--buttons">
       <button className="button" onClick={undo}>Undo</button>
      <button className="button" onClick={redo}>Redo</button> 
       </section>
      
      
    </div>
  );
};

export default Toolbar;
