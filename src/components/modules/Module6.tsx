import React, { useState, useEffect } from 'react';
import FileUploader from '../FileUploader';
import TextDisplay from '../TextDisplay';
import ErrorMessage from '../ErrorMessage';
import { useFileContext } from '../../context/FileContext';
import { removeExtraSpaces, downloadTextFile } from '../../utils/textProcessing';

const Module6: React.FC = () => {
  const { inputText, fileName, setInputText, setFileName } = useFileContext();
  const [outputText, setOutputText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!inputText) {
      setOutputText('');
      setError('');
      return;
    }
    setOutputText(removeExtraSpaces(inputText));
  }, [inputText]);

  const handleFileSelect = async (selectedFile: File) => {
    setError('');
    setFileName(selectedFile.name);
    try {
      const text = await selectedFile.text();
      if (text.trim().length === 0) {
        setError('Файл пуст');
        setInputText('');
        return;
      }
      setInputText(text);
    } catch {
      setError('Ошибка чтения файла');
    }
  };

  const handleDownload = () => {
    if (outputText) downloadTextFile(outputText, 'result_module6.txt');
  };

  return (
    <div>
      <div className="module-header">
        <h2>Модуль 6 — Удаление лишних пробелов</h2>
        <p>Исполнитель: Могильников</p>
        <p style={{ marginTop: '8px', fontSize: '14px', color: '#333' }}>
          Удаление лишних пробелов из текста (множественные пробелы заменяются на один).
        </p>
      </div>

      {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}

      <div className="module-section">
        <FileUploader onFileSelect={handleFileSelect} fileName={fileName} />

        {inputText && <TextDisplay title="Исходный файл" content={inputText} />}

        {outputText && (
          <TextDisplay title="Результат" content={outputText} onDownload={handleDownload} />
        )}
      </div>
    </div>
  );
};

export default Module6;
