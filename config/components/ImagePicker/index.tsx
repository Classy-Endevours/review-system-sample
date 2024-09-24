import React, { useState, ChangeEvent } from 'react';

// Define the props interface
interface ImagePickerProps {
  name: string;
  onChange: (url: string) => void;
  value?: string; // value is optional
}

const ImagePicker: React.FC<ImagePickerProps> = ({ name, onChange, value }) => {
  const [imageUrl, setImageUrl] = useState<string>(value || '');

  // Function to handle file selection and generate image URL
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Use optional chaining in case no file is selected
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      onChange(url); // Pass the image URL to parent component
    }
  };

  return (
    <div>
      <label htmlFor={name} style={{ display: 'block', marginBottom: '8px' }}>
        Select Image:
      </label>
      <input
        type="file"
        id={name}
        accept="image/*"
        onChange={handleImageChange}
      />
      {imageUrl && (
        <div style={{ marginTop: '16px' }}>
          <img
            src={imageUrl}
            alt="Selected"
            style={{ width: '200px', height: '200px', objectFit: 'cover', border: '1px solid #ccc' }}
          />
        </div>
      )}
    </div>
  );
};

export default ImagePicker;
