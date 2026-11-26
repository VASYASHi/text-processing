import React, { useState } from 'react';
import FileUploader from '../FileUploader';
import TextDisplay from '../TextDisplay';
import ErrorMessage from '../ErrorMessage';
import { analyzeSentences, downloadTextFile, readTextFile } from '../../utils/textProcessing';
import type { SentencesResult } from '../../utils/textProcessing';

const Module8: React.FC = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [result, setResult] = useState<SentencesResult | null>(null);
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

      const res = analyzeSentences(text);
      setResult(res);

      const output = `Количество предложений: ${res.count}\n\n${res.sentences
        .map((s, i) => `${i + 1}. "${s.text}" — длина: ${s.length}`)
        .join('\n')}`;
      setOutputText(output);
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