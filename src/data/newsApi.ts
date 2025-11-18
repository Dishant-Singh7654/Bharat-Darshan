// Utility functions for fetching news from NewsAPI.org

// Define the structure of a news article
export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

// Define the structure of the API response
interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

// Available news categories
export type NewsCategory = 'all' | 'culture' | 'heritage' | 'tourism';

function getRuntimeEnv(key: string): string | undefined {
  const w = typeof window !== 'undefined' ? (window as any) : undefined;
  return w?.__ENV?.[key];
}

// Prefer runtime-provided env (populated by public/env.js on hosted site) then fall back to Vite env
const NEWS_API_KEY = (getRuntimeEnv('VITE_NEWS_API_KEY') || import.meta.env.VITE_NEWS_API_KEY) as string | undefined;

// Function to fetch news related to Indian culture and heritage with optional category filtering
export const fetchIndianCultureNews = async (category: NewsCategory = 'all'): Promise<NewsArticle[]> => {
  try {
    if (!NEWS_API_KEY) {
      console.warn('News API key is not set. Provide VITE_NEWS_API_KEY via environment or public/env.js.');
      return [];
    }
    
    // Create a query based on the selected category
    let query = '';
    
    switch(category) {
      case 'culture':
        query = encodeURIComponent('(india AND (culture OR festival OR tradition OR art OR music OR dance OR language))');
        break;
      case 'heritage':
        query = encodeURIComponent('(india AND (heritage OR monument OR temple OR "historical site" OR architecture OR history OR ancient))');
        break;
      case 'tourism':
        query = encodeURIComponent('(india AND (tourism OR "tourist destination" OR travel OR vacation OR visit OR attraction))');
        break;
      case 'all':
      default:
        query = encodeURIComponent('(india AND (culture OR heritage OR tourism OR temple OR monument OR festival OR tradition OR "historical site" OR "tourist destination"))');
        break;
    }
    
    // Set up the API URL with parameters
    const url = `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&pageSize=15&apiKey=${NEWS_API_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`News API responded with status: ${response.status}`);
    }
    
    const data: NewsApiResponse = await response.json();
    
    if (data.status !== 'ok') {
      throw new Error(`News API returned status: ${data.status}`);
    }
    
    return data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

// Function to format the publication date
export const formatPublishedDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Function to get a fallback image URL if the article doesn't have an image
export const getFallbackImageUrl = (): string => {
  return 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1000';
};