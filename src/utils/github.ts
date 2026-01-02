// src/utils/github.ts

export interface GitHubRepo {
  name: string;
  description: string;
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  language: string;
  lastUpdate: string;
  url: string;
}

export interface GitHubStats {
  totalStars: number;
  totalForks: number;
  totalRepos: number;
  languages: string[];
}

const GITHUB_API = 'https://api.github.com';
const CACHE_TIME = 3600000; // 1 час в миллисекундах

// Кэш для избежания rate limit
const cache = new Map<string, { data: any; timestamp: number }>();

function getCached<T>(key: string): T | null {
  const cached = cache.get(key);
  if (!cached) return null;

  const now = Date.now();
  if (now - cached.timestamp > CACHE_TIME) {
    cache.delete(key);
    return null;
  }

  return cached.data as T;
}

function setCache(key: string, data: any): void {
  cache.set(key, { data, timestamp: Date.now() });
}

async function fetchGitHub(endpoint: string): Promise<any> {
  const cached = getCached(endpoint);
  if (cached) return cached;

  try {
    const response = await fetch(`${GITHUB_API}${endpoint}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        // Добавьте токен для увеличения rate limit (опционально)
        // 'Authorization': `token ${import.meta.env.GITHUB_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    setCache(endpoint, data);
    return data;
  } catch (error) {
    console.error('Failed to fetch from GitHub:', error);
    return null;
  }
}

export async function getRepo(owner: string, repo: string): Promise<GitHubRepo | null> {
  const data = await fetchGitHub(`/repos/${owner}/${repo}`);
  if (!data) return null;

  return {
    name: data.name,
    description: data.description || '',
    stars: data.stargazers_count,
    forks: data.forks_count,
    watchers: data.watchers_count,
    openIssues: data.open_issues_count,
    language: data.language || 'Unknown',
    lastUpdate: new Date(data.updated_at).toLocaleDateString('ru-RU'),
    url: data.html_url,
  };
}

export async function getUserRepos(username: string): Promise<GitHubRepo[]> {
  const data = await fetchGitHub(`/users/${username}/repos?sort=updated&per_page=100`);
  if (!data || !Array.isArray(data)) return [];

  return data.map((repo: any) => ({
    name: repo.name,
    description: repo.description || '',
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    watchers: repo.watchers_count,
    openIssues: repo.open_issues_count,
    language: repo.language || 'Unknown',
    lastUpdate: new Date(repo.updated_at).toLocaleDateString('ru-RU'),
    url: repo.html_url,
  }));
}

export async function getUserStats(username: string): Promise<GitHubStats | null> {
  const repos = await getUserRepos(username);
  if (!repos.length) return null;

  const totalStars = repos.reduce((sum, repo) => sum + repo.stars, 0);
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks, 0);
  const languages = [...new Set(repos.map(repo => repo.language))];

  return {
    totalStars,
    totalForks,
    totalRepos: repos.length,
    languages: languages.filter(lang => lang !== 'Unknown'),
  };
}

export async function getRepoContributors(owner: string, repo: string, limit = 10) {
  const data = await fetchGitHub(`/repos/${owner}/${repo}/contributors?per_page=${limit}`);
  if (!data || !Array.isArray(data)) return [];

  return data.map((contributor: any) => ({
    login: contributor.login,
    avatar: contributor.avatar_url,
    contributions: contributor.contributions,
    profile: contributor.html_url,
  }));
}
