export interface Photo {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export interface PhotoDetails extends Photo {
  title?: string;
  description?: string;
}