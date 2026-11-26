import React, { useState } from 'react';
import FileUploader from '../FileUploader';
import TextDisplay from '../TextDisplay';
import ErrorMessage from '../ErrorMessage';
import { reverseCharsInWords, downloadTextFile, readTextFile } from '../../utils/textProcessing';

const Module5: React.FC = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [error, setError] = useState('');

  const handleFileSelect = async (selectedFile: File) => {
    setError('');
    setFileName(selectedFile.name);
    try {
      const text = await readTextFile(selectedFile);
      if (text.trim().length === 0) {
        setError('Файл пуст');
        setInputText('');
        setOutputText('');
        return;
      }
      setInputText(text);

      const result = reverseCharsInWords(text);
      setOutputText(result);
    } catch {
      setError('Ошибка чтения файла');
    }
  };

  const handleDownload = () => {
    if (outputText) downloadTextFile(outputText, 'result_module5.txt');
  };

  return (
    <div>
      <div className="module-header">
        <h2>Модуль 5 — Реверс символов в словах</h2>
        <p>Исполнитель: Зиганшин Арсений</p>
        <p style={{ marginTop: '8px', fontSize: '14px', color: '#333' }}>
          Символы каждого слова записываются в обратном порядке, порядок слов не меняется.
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

export default Module5;