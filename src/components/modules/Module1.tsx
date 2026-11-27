import React, { useState, useEffect } from 'react';
import FileUploader from '../FileUploader';
import TextDisplay from '../TextDisplay';
import ErrorMessage from '../ErrorMessage';
import { useFileContext } from '../../context/FileContext';
import { countLetterCases, downloadTextFile } from '../../utils/textProcessing';
import type { LetterStat } from '../../utils/textProcessing';

const Module1: React.FC = () => {
  const { inputText, fileName, setInputText, setFileName } = useFileContext();
  const [outputText, setOutputText] = useState('');
  const [stats, setStats] = useState<LetterStat[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!inputText) {
      setOutputText('');
      setStats([]);
      setError('');
      return;
    }
    const result = countLetterCases(inputText);
    setStats(result);
    setOutputText(
      result.map(s => `${s.letter} (${s.case === 'upper' ? 'верхний' : 'нижний'} регистр): ${s.count}`).join('\n')
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
    if (outputText) {
      downloadTextFile(outputText, 'result_module1.txt');
    }
  };

  return (
    <div>
      <div className="module-header">
        <h2>Модуль 1 — Подсчёт букв верхнего и нижнего регистра</h2>
        <p>Исполнитель: Шихов Василий</p>
        <p style={{ marginTop: '8px', fontSize: '14px', color: '#333' }}>
          Вычисление количества букв верхнего и нижнего регистров (каждой буквы отдельно), упорядочивание по возрастанию.
        </p>
      </div>

      {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}

      <div className="module-section">
        <FileUploader
          onFileSelect={handleFileSelect}
          fileName={fileName}
          label="Выбрать текстовый файл (.txt)"
        />

        {inputText && (
          <TextDisplay title="Исходный файл" content={inputText} />
        )}

        {outputText && (
          <TextDisplay
            title="Результат (статистика по буквам)"
            content={outputText}
            onDownload={handleDownload}
            downloadLabel="Скачать результат"
          />
        )}

        {stats.length > 0 && (
          <div className="result-box">
            <h3>Таблица результатов</h3>
            {stats.map((s, i) => (
              <div key={i} className="stat-item">
                <span>
                  <strong>{s.letter}</strong> ({s.case === 'upper' ? 'верхний' : 'нижний'} регистр)
                </span>
                <span>{s.count}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Module1;
