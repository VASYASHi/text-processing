import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Module1 from './components/modules/Module1';
import Module2 from './components/modules/Module2';
import Module3 from './components/modules/Module3';
import Module4 from './components/modules/Module4';
import Module5 from './components/modules/Module5';
import Module6 from './components/modules/Module6';
import Module7 from './components/modules/Module7';
import Module8 from './components/modules/Module8';
import Module9 from './components/modules/Module9';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState(1);

  const renderModule = () => {
    switch (activeModule) {
      case 1: return <Module1 />;
      case 2: return <Module2 />;
      case 3: return <Module3 />;
      case 4: return <Module4 />;
      case 5: return <Module5 />;
      case 6: return <Module6 />;
      case 7: return <Module7 />;
      case 8: return <Module8 />;
      case 9: return <Module9 />;
      default: return <Module1 />;
    }
  };

  return (
    <div>
      <Navbar activeModule={activeModule} onModuleChange={setActiveModule} />
      <div className="container">
        {renderModule()}
      </div>
    </div>
  );
};

export default App;