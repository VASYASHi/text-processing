import React, { useState, useEffect } from 'react';
import FileUploader from '../FileUploader';
import TextDisplay from '../TextDisplay';
import ErrorMessage from '../ErrorMessage';
import { useFileContext } from '../../context/FileContext';
import { removeSpaces, restoreSpaces, downloadTextFile } from '../../utils/textProcessing';

const Module3: React.FC = () => {
  const { inputText, fileName, setInputText, setFileName } = useFileContext();
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<'remove' | 'restore'>('remove');
  const [positionsFile, setPositionsFile] = useState<File | null>(null);
  const [positionsFileName, setPositionsFileName] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!inputText) {
      setOutputText('');
      setError('');
      return;
    }
    setError('');

    if (mode === 'remove') {
      const { result } = removeSpaces(inputText);
      setOutputText(result);
    } else {
      if (!positionsFile) {
        setError('Выберите файл позиций');
        return;
      }
      positionsFile.text().then((posContent) => {
        const positions = posContent.split('\n').map(p => parseInt(p.trim(), 10)).filter(n => !isNaN(n));
        if (positions.length === 0) {
          setError('Некорректный файл позиций');
          return;
        }
        setOutputText(restoreSpaces(inputText, positions));
      }).catch(() => {
        setError('Некорректный файл позиций');
      });
    }
  }, [inputText, mode, positionsFile]);

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

  const handlePositionsFileSelect = (selectedFile: File) => {
    setError('');
    setPositionsFile(selectedFile);
    setPositionsFileName(selectedFile.name);
  };

  const handleDownload = () => {
    if (outputText) downloadTextFile(outputText, 'result_module3.txt');
  };

  return (
    <div>
      <div className="module-header">
        <h2>Модуль 3 — Удаление и восстановление пробелов</h2>
        <p>Исполнитель: Габбасов Савелий</p>
      </div>

      {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}

      <div className="module-section">
        <div className="mode-selector">
          <button
            className={`mode-btn ${mode === 'remove' ? 'active' : ''}`}
            onClick={() => setMode('remove')}
          >
            Удалить пробелы
          </button>
          <button
            className={`mode-btn ${mode === 'restore' ? 'active' : ''}`}
            onClick={() => setMode('restore')}
          >
            Восстановить пробелы
          </button>
        </div>

        <FileUploader onFileSelect={handleFileSelect} fileName={fileName} />

        {mode === 'restore' && (
          <FileUploader
            onFileSelect={handlePositionsFileSelect}
            fileName={positionsFileName}
            label="Выбрать файл позиций"
          />
        )}

        {inputText && <TextDisplay title="Исходный файл" content={inputText} />}

        {outputText && (
          <TextDisplay
            title={mode === 'remove' ? 'Текст без пробелов' : 'Восстановленный текст'}
            content={outputText}
            onDownload={handleDownload}
          />
        )}
      </div>
    </div>
  );
};

export default Module3;
