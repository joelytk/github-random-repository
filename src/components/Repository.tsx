import { StarIcon } from '@heroicons/react/20/solid';
import {
  ChevronRightIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import { RepoForkedIcon } from '@primer/octicons-react';
import { useEffect, useReducer } from 'react';

import { octokit } from '../config/octokit';
import {
  FETCH_RANDOM_REPOSITORY_ERROR,
  FETCH_RANDOM_REPOSITORY_REQUEST,
  FETCH_RANDOM_REPOSITORY_SUCCESS
} from '../constants';
import { githubLanguageColors } from '../data/githubLanguageColors';
import { repositoryReducer } from '../reducers/repositoryReducer';

const Repository = ({ selectedLanguage }) => {
  const [state, dispatch] = useReducer(repositoryReducer, {
    data: {},
    isLoading: false,
    error: null
  });

  useEffect(() => {
    if (selectedLanguage) {
      fetchRandomRepository();
    }
  }, [selectedLanguage]);

  const fetchRandomRepository = async () => {
    dispatch({ type: FETCH_RANDOM_REPOSITORY_REQUEST });

    try {
      const res = await octokit.request(
        `GET /search/repositories?q=language:${selectedLanguage}`,
        {
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        }
      );
      const data = await res.data;
      const repositories = await data.items;

      const randomIndex = Math.ceil(Math.random() * repositories.length);
      const randomRepository = repositories[randomIndex];

      dispatch({
        type: FETCH_RANDOM_REPOSITORY_SUCCESS,
        payload: randomRepository
      });
    } catch (error) {
      dispatch({ type: FETCH_RANDOM_REPOSITORY_ERROR, payload: error });
      console.error({ error });
    }
  };

  if (selectedLanguage === '' || state.isLoading) {
    return (
      <div className='w-full bg-zinc-200 rounded-lg py-8 px-4 text-center'>
        {selectedLanguage === '' && <p>Please select a language</p>}
        {state.isLoading && <p>Loading, please wait...</p>}
      </div>
    );
  }

  if (state.error) {
    return (
      <div>
        <div className='w-full bg-red-200 rounded-lg py-8 px-4 text-center mb-3'>
          <p>Error fetching repositories</p>
        </div>
        <button className='bg-red-600'>Click to retry</button>
      </div>
    );
  }

  if (state.data?.id) {
    return (
      <div>
        <div className='w-full border rounded-lg p-4 mb-3 relative'>
          <a href={state.data?.html_url} target='_blank'>
            <ChevronRightIcon className='w-4 h-4 absolute top-2.5 right-2.5 -rotate-45 cursor-pointer' />
          </a>
          <h2 className='mb-2 text-base'>{state.data?.full_name}</h2>
          <p className='opacity-50 mb-4 text-sm'>{state.data?.description}</p>
          <div className='flex flex-wrap items-center gap-4'>
            <div className='repo-info'>
              <div
                className='w-3 h-3 rounded-full'
                style={{
                  backgroundColor:
                    githubLanguageColors[state.data?.language] || 'gray'
                }}
              ></div>
              <p>{state.data?.language}</p>
            </div>
            <div className='repo-info'>
              <StarIcon className='w-4 h-4' />
              <p>{state.data?.stargazers_count?.toLocaleString()}</p>
            </div>
            <div className='repo-info'>
              <RepoForkedIcon size='small' />
              <p>{state.data?.forks_count?.toLocaleString()}</p>
            </div>
            <div className='repo-info'>
              <ExclamationCircleIcon className='w-4 h-4' />
              <p>{state.data?.open_issues_count?.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <button className='bg-black' onClick={fetchRandomRepository}>
          Refresh
        </button>
      </div>
    );
  }
};

export default Repository;
