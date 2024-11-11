export interface MediaData {
  b64: string;
  id?: string;
}

export interface AdFormData {
  title: string;
  description: string;
  price: number;
  minimumPrice: number;
  type: string;
  acceptMessages: boolean;
  location: string;
  categoryId: string;
  subcategoryId: string;
  adStatus: 'ACTIVE';
  mediaData?: MediaData[];
}

export interface Category {
  id: string;
  name: string;
}

export interface Subcategory {
  id: string;
  name: string;
} 