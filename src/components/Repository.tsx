import { useReducer } from 'react';

import { repositoryReducer } from '../reducers/repositoryReducer';

const Repository = ({ selectedLanguage }) => {
  const [state, dispatch] = useReducer(repositoryReducer, {
    data: [],
    isLoading: false,
    error: null
  });

  return (
    <div className='w-full bg-zinc-200 rounded-lg py-8 px-4 text-center'>
      {selectedLanguage === '' && <p>Please select a language</p>}
      {state.isLoading && <p>Loading, please wait...</p>}
    </div>
  );
};

export default Repository;
