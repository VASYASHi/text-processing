import React from 'react';

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss }) => {
  return (
    <div className="error-message" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span>⚠ {message}</span>
      {onDismiss && (
        <button className="btn" onClick={onDismiss} style={{ padding: '4px 12px', fontSize: '14px' }}>
          Закрыть
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;