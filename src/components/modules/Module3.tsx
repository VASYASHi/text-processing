import React, { useState } from 'react';
import FileUploader from '../FileUploader';
import TextDisplay from '../TextDisplay';
import ErrorMessage from '../ErrorMessage';
import { removeSpaces, restoreSpaces, downloadTextFile, readTextFile } from '../../utils/textProcessing';

const Module3: React.FC = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<'remove' | 'restore'>('remove');
  const [positionsFile, setPositionsFile] = useState<File | null>(null);
  const [positionsFileName, setPositionsFileName] = useState<string | null>(null);
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
    } catch {
      setError('Ошибка чтения файла');
    }
  };

  const handlePositionsFileSelect = async (selectedFile: File) => {
    setError('');
    setPositionsFile(selectedFile);
    setPositionsFileName(selectedFile.name);
  };

  const processText = () => {
    setError('');
    if (!inputText) {
      setError('Файл не выбран');
      return;
    }

    if (mode === 'remove') {
      const { result, positions } = removeSpaces(inputText);
      setOutputText(result);
      // Сохраняем позиции в отдельный файл автоматически
      const positionsContent = positions.join('\n');
      downloadTextFile(positionsContent, 'positions.txt');
    } else {
      if (!positionsFile) {
        setError('Некорректный файл позиций');
        return;
      }
      readTextFile(positionsFile).then((posContent) => {
        const positions = posContent.split('\n').map(p => parseInt(p.trim(), 10)).filter(n => !isNaN(n));
        if (positions.length === 0) {
          setError('Некорректный файл позиций');
          return;
        }
        const restored = restoreSpaces(inputText, positions);
        setOutputText(restored);
      }).catch(() => {
        setError('Некорректный файл позиций');
      });
    }
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

        <button className="btn btn-primary" onClick={processText} disabled={!inputText}>
          Выполнить
        </button>

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