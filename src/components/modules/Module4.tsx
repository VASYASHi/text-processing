import React, { useState, useEffect } from 'react';
import FileUploader from '../FileUploader';
import TextDisplay from '../TextDisplay';
import ErrorMessage from '../ErrorMessage';
import { useFileContext } from '../../context/FileContext';
import { countPunctuation, downloadTextFile } from '../../utils/textProcessing';
import type { PunctuationStat } from '../../utils/textProcessing';

const Module4: React.FC = () => {
  const { inputText, fileName, setInputText, setFileName } = useFileContext();
  const [outputText, setOutputText] = useState('');
  const [stats, setStats] = useState<PunctuationStat[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!inputText) {
      setOutputText('');
      setStats([]);
      setError('');
      return;
    }
    const result = countPunctuation(inputText);
    setStats(result);
    setOutputText(
      result.map(s => `${s.symbol === ' ' ? 'пробел' : s.symbol}: ${s.count}`).join('\n')
    );
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
    if (outputText) downloadTextFile(outputText, 'result_module4.txt');
  };

  return (
    <div>
      <div className="module-header">
        <h2>Модуль 4 — Знаки препинания и пробелы</h2>
        <p>Исполнитель: Нурисламов Евгений</p>
        <p style={{ marginTop: '8px', fontSize: '14px', color: '#333' }}>
          Подсчёт повторений каждого знака препинания и пробелов, сортировка по возрастанию.
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
                <span><strong>{s.symbol === ' ' ? 'пробел' : s.symbol}</strong></span>
                <span>{s.count}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Module4;
