import React, { createContext, useContext, useState, useCallback } from 'react';

interface FileContextType {
  inputText: string;
  fileName: string | null;
  setInputText: (text: string) => void;
  setFileName: (name: string | null) => void;
  clearFile: () => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [inputText, setInputText] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);

  const clearFile = useCallback(() => {
    setInputText('');
    setFileName(null);
  }, []);

  return (
    <FileContext.Provider value={{ inputText, fileName, setInputText, setFileName, clearFile }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = (): FileContextType => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error('useFileContext must be used within FileProvider');
  }
  return context;
};
