import React, { useState } from 'react';
import FileUploader from '../FileUploader';
import TextDisplay from '../TextDisplay';
import ErrorMessage from '../ErrorMessage';
import { reverseWordsInSentences, downloadTextFile, readTextFile } from '../../utils/textProcessing';

const Module9: React.FC = () => {
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

      const result = reverseWordsInSentences(text);
      setOutputText(result);
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