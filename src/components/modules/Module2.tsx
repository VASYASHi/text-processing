import React, { useState } from 'react';
import FileUploader from '../FileUploader';
import TextDisplay from '../TextDisplay';
import ErrorMessage from '../ErrorMessage';
import { getWordLengths, downloadTextFile, readTextFile } from '../../utils/textProcessing';
import type { WordLengthsResult } from '../../utils/textProcessing';

const Module2: React.FC = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [result, setResult] = useState<WordLengthsResult | null>(null);
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
        setResult(null);
        return;
      }
      setInputText(text);

      const res = getWordLengths(text);
      setResult(res);

      const output = `Общее количество слов: ${res.totalWords}\n\nДлины слов (по убыванию):\n${res.lengths.join(', ')}`;
      setOutputText(output);
    } catch {
      setError('Ошибка чтения файла');
    }
  };

  const handleDownload = () => {
    if (outputText) downloadTextFile(outputText, 'result_module2.txt');
  };

  return (
    <div>
      <div className="module-header">
        <h2>Модуль 2 — Длины слов</h2>
        <p>Исполнитель: Нестеров Кирилл</p>
        <p style={{ marginTop: '8px', fontSize: '14px', color: '#333' }}>
          Вычисление длин всех слов и общего количества слов, сортировка по убыванию.
        </p>
      </div>

      {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}

      <div className="module-section">
        <FileUploader onFileSelect={handleFileSelect} fileName={fileName} />

        {inputText && <TextDisplay title="Исходный файл" content={inputText} />}

        {outputText && (
          <TextDisplay title="Результат" content={outputText} onDownload={handleDownload} />
        )}

        {result && (
          <div className="result-box">
            <h3>Сводка</h3>
            <div className="stat-item">
              <span>Общее количество слов:</span>
              <strong>{result.totalWords}</strong>
            </div>
            <div className="stat-item">
              <span>Длины (по убыванию):</span>
              <span>{result.lengths.join(', ')}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Module2;