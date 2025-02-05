import { useState } from 'react';

import { Repository, Select, Title } from './components';

const App = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');

  return (
    <div className='container mx-auto px-4 max-w-xl pt-8'>
      <Title />
      <Select
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />
      <Repository selectedLanguage={selectedLanguage} />
    </div>
  );
};

export default App;
