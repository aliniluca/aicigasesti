export interface Media {
  url: string;
  type: string;
  // Add other relevant properties
}

export interface Ad {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: string;
  mediaData: Media[]; // Updated from string to Media[]
  // ...
} 