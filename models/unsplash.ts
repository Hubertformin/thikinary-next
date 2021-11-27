export interface UnSplashPhoto {
  id: string;
  created_at: string;
  updated_at: string;
  promoted_at: string;
  width: number;
  height: number;
  color: string;
  description: string;
  alt_description: string;
  urls: {
    raw: string,
    full: string,
    regular: string;
    small: string,
    thumb: string;
  };
  links: {
    self: string,
    html: string,
    download: string,
    download_location: string
  };
  categories: string[];
  likes: number;
  liked_by_user: boolean;
  current_user_collections: string[];
  user: {
    id: string,
    updated_at: string,
    username: string,
    name: string,
    first_name: string
  };
  views: number;
  downloads: number;
}

export interface UnSplashSearchResults {
  results: UnSplashPhoto[];
  total: number;
  total_pages: number;
}
