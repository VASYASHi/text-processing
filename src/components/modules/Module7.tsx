import React, { useState } from 'react';
import FileUploader from '../FileUploader';
import TextDisplay from '../TextDisplay';
import ErrorMessage from '../ErrorMessage';
import { countLetterFrequency, downloadTextFile, readTextFile } from '../../utils/textProcessing';
import type { LetterFrequency } from '../../utils/textProcessing';

const Module7: React.FC = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [stats, setStats] = useState<LetterFrequency[]>([]);
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
        setStats([]);
        return;
      }
      setInputText(text);

      const result = countLetterFrequency(text);
      setStats(result);

      const output = result.map(s => `${s.letter}: ${s.count}`).join('\n');
      setOutputText(output);
    } catch {
      setError('Ошибка чтения файла');
    }
  };

  const handleDownload = () => {
    if (outputText) downloadTextFile(outputText, 'result_module7.txt');
  };

  return (
    <div>
      <div className="module-header">
        <h2>Модуль 7 — Частота букв</h2>
        <p>Исполнитель: Миних Максим</p>
        <p style={{ marginTop: '8px', fontSize: '14px', color: '#333' }}>
          Подсчёт повторений каждой русской и английской буквы (без учёта регистра), сортировка по убыванию.
        </p>
      </div>

      {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}

      <div className="module-section">
        <FileUploader onFileSelect={handleFileSelect} fileName={fileName} />

        {inputText && <TextDisplay title="Исходный файл" content={inputText} />}

        {outputText && (
          <TextDisplay title="Результат" content={outputText} onDownload={handleDownload} />
        )}

        {stats.length > 0 && (
          <div className="result-box">
            <h3>Таблица результатов</h3>
            {stats.map((s, i) => (
              <div key={i} className="stat-item">
                <span><strong>{s.letter}</strong></span>
                <span>{s.count}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Module7;