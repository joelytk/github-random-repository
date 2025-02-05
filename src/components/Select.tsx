import { ChangeEvent, useEffect, useReducer } from 'react';

import {
  FETCH_LANGUAGES_ERROR,
  FETCH_LANGUAGES_REQUEST,
  FETCH_LANGUAGES_SUCCESS
} from '../constants';
import { languagesReducer } from '../reducers/languagesReducer';
import { Language } from '../types/Language';

const Select = ({ selectedLanguage, setSelectedLanguage }) => {
  const [state, dispatch] = useReducer(languagesReducer, {
    data: [],
    isLoading: false,
    error: null
  });

  useEffect(() => {
    const fetchLanguages = async () => {
      dispatch({ type: FETCH_LANGUAGES_REQUEST });

      try {
        const res: Response = await fetch(
          'https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json'
        );
        const data: Language[] = await res.json();
        dispatch({ type: FETCH_LANGUAGES_SUCCESS, payload: data });
      } catch (error) {
        console.error({ error });
        dispatch({ type: FETCH_LANGUAGES_ERROR, payload: error });
      }
    };

    fetchLanguages();
  }, []);

  const handleChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
  };

  return (
    <select
      className='mb-4'
      value={selectedLanguage}
      onChange={handleChange}
      disabled={state.isLoading}
    >
      {state.data.map((language: Language) => (
        <option key={language.title} value={language.value}>
          {language.title}
        </option>
      ))}
    </select>
  );
};

export default Select;
