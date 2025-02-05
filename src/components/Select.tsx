import { Select } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { ChangeEvent, useEffect, useReducer } from 'react';

import {
  FETCH_LANGUAGES_ERROR,
  FETCH_LANGUAGES_REQUEST,
  FETCH_LANGUAGES_SUCCESS
} from '../constants';
import { languagesReducer } from '../reducers/languagesReducer';
import { Language } from '../types/Language';

const LanguageSelect = ({ selectedLanguage, setSelectedLanguage }) => {
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
    <div className='relative'>
      <Select
        className='mb-4 block w-full appearance-none rounded-lg border py-1.5 px-3 text-sm'
        value={selectedLanguage}
        onChange={handleChange}
        disabled={state.isLoading}
      >
        {state.data.map((language: Language, index: number) => (
          <option key={index} value={language.value}>
            {language.title}
          </option>
        ))}
      </Select>
      <ChevronDownIcon
        className='group pointer-events-none absolute top-[7px] right-2.5 size-5 fill-black'
        aria-hidden='true'
      />
    </div>
  );
};

export default LanguageSelect;
