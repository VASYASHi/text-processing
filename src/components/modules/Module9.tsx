import React, { useState, useEffect } from 'react';
import FileUploader from '../FileUploader';
import TextDisplay from '../TextDisplay';
import ErrorMessage from '../ErrorMessage';
import { useFileContext } from '../../context/FileContext';
import { reverseWordsInSentences, downloadTextFile } from '../../utils/textProcessing';

const Module9: React.FC = () => {
  const { inputText, fileName, setInputText, setFileName } = useFileContext();
  const [outputText, setOutputText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!inputText) {
      setOutputText('');
      setError('');
      return;
    }
    setOutputText(reverseWordsInSentences(inputText));
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
    if (outputText) downloadTextFile(outputText, 'result_module9.txt');
  };

  return (
    <div>
      <div className="module-header">
        <h2>Модуль 9 — Реверс слов в предложениях</h2>
        <p>Исполнитель: Ржавитин Денис</p>
        <p style={{ marginTop: '8px', fontSize: '14px', color: '#333' }}>
          Слова в каждом предложении записываются в обратном порядке, порядок букв в словах не меняется.
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

export default Module9;
