import React, { useState, useEffect } from 'react';
import FileUploader from '../FileUploader';
import TextDisplay from '../TextDisplay';
import ErrorMessage from '../ErrorMessage';
import { useFileContext } from '../../context/FileContext';
import { analyzeSentences, downloadTextFile } from '../../utils/textProcessing';
import type { SentencesResult } from '../../utils/textProcessing';

const Module8: React.FC = () => {
  const { inputText, fileName, setInputText, setFileName } = useFileContext();
  const [outputText, setOutputText] = useState('');
  const [result, setResult] = useState<SentencesResult | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!inputText) {
      setOutputText('');
      setResult(null);
      setError('');
      return;
    }
    const res = analyzeSentences(inputText);
    setResult(res);
    setOutputText(
      `Количество предложений: ${res.count}\n\n${res.sentences
        .map((s, i) => `${i + 1}. "${s.text}" — длина: ${s.length}`)
        .join('\n')}`
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
    if (outputText) downloadTextFile(outputText, 'result_module8.txt');
  };

  return (
    <div>
      <div className="module-header">
        <h2>Модуль 8 — Анализ предложений</h2>
        <p>Исполнитель: Знаменский Никита</p>
        <p style={{ marginTop: '8px', fontSize: '14px', color: '#333' }}>
          Подсчёт количества предложений и их длин, сортировка по возрастанию.
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
              <span>Количество предложений:</span>
              <strong>{result.count}</strong>
            </div>
            {result.sentences.map((s, i) => (
              <div key={i} className="stat-item">
                <span style={{ maxWidth: '70%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {i + 1}. {s.text}
                </span>
                <span>длина: {s.length}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Module8;
