import React from 'react';

interface NavbarProps {
  activeModule: number;
  onModuleChange: (module: number) => void;
}

const modules = [
  { id: 1, name: 'Регистр букв', author: 'Шихов' },
  { id: 2, name: 'Длины слов', author: 'Нестеров' },
  { id: 3, name: 'Пробелы', author: 'Габбасов' },
  { id: 4, name: 'Знаки препинания', author: 'Нурисламов' },
  { id: 5, name: 'Реверс слов', author: 'Зиганшин' },
  { id: 6, name: 'Лишние пробелы', author: 'Могильников' },
  { id: 7, name: 'Частота букв', author: 'Миних' },
  { id: 8, name: 'Предложения', author: 'Знаменский' },
  { id: 9, name: 'Реверс в предложениях', author: 'Ржавитин' },
];

const Navbar: React.FC<NavbarProps> = ({ activeModule, onModuleChange }) => {
  return (
    <nav style={{
      borderBottom: '3px solid #000000',
      padding: '16px 20px',
      background: '#ffffff',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '12px' }}>
          Обработка текстовых файлов
        </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {modules.map((mod) => (
            <button
              key={mod.id}
              onClick={() => onModuleChange(mod.id)}
              className="btn"
              style={{
                padding: '8px 14px',
                fontSize: '14px',
                background: activeModule === mod.id ? '#000000' : '#ffffff',
                color: activeModule === mod.id ? '#ffffff' : '#000000',
              }}
              title={mod.author}
            >
              {mod.id}. {mod.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;