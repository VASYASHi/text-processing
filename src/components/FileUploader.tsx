import React, { useRef } from 'react';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  fileName: string | null;
  label?: string;
  accept?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect, fileName, label = 'Выбрать файл', accept = '.txt' }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
    // Сброс value чтобы можно было выбрать тот же файл повторно
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
      <button className="btn btn-primary" onClick={handleClick}>
        {label}
      </button>
      {fileName && (
        <p className="file-info">Выбран файл: {fileName}</p>
      )}
    </div>
  );
};

export default FileUploader;