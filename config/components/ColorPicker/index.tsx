import React, { useState, ChangeEvent } from "react";

// Define the props interface
interface ColorPickerProps {
  name: string;
  onChange: (color: string) => void;
  value?: string; // value is optional
}

const ColorPicker: React.FC<ColorPickerProps> = ({ name, onChange, value }) => {
  const [color, setColor] = useState<string>(value || "#ffffff"); // Default to white

  // Function to handle color change
  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    onChange(newColor); // Pass the color to parent component
  };

  return ( 
    <div className="w-full flex justify-center gap-x-4 text">
      <label htmlFor={name} style={{ display: "block", marginBottom: "8px" }}>
        Select Color: <span className="font-bold" >{color}</span>
      </label>
      <input
        type="color"
        id={name}
        value={color}
        onChange={handleColorChange}
        style={{ marginBottom: "16px", width: "10%" }}
        className="rounded-full"
      />
    </div>
  );
};

export default ColorPicker;
