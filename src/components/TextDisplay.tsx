import React from 'react';

interface TextDisplayProps {
  title: string;
  content: string;
  onDownload?: () => void;
  downloadLabel?: string;
}

const TextDisplay: React.FC<TextDisplayProps> = ({ title, content, onDownload, downloadLabel = 'Скачать результат' }) => {
  return (
    <div className="result-box">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h3>{title}</h3>
        {onDownload && (
          <button className="btn" onClick={onDownload}>
            {downloadLabel}
          </button>
        )}
      </div>
      <textarea
        className="text-area"
        value={content}
        readOnly
        style={{ minHeight: '150px' }}
      />
    </div>
  );
};

export default TextDisplay;