import { Octokit } from '@octokit/core';

export const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_PERSONAL_ACCESS_TOKEN
});
