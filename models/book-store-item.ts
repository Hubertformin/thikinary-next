export interface BookStoreItem {
  id?: string;
  author?: BookAuthor;
  genres?: string[];
  coverImageUrl?: string;
  coverImageFileId?: string;
  description?: string;
  edition?: string;
  isbn?: string;
  bookUrl?: string;
  language?: string;
  pricing?: PricingCondition;
  pages?: number;
  publisher?: string;
  publicationDate?: Date;
  thumbnails?: {
    small: string;
    medium: string
  };
  fileSize?: number;
  title?: string;
  addedDate?: Date;
}

export interface BookAuthor {
  about: string;
  id?: string;
  displayName?: string;
  email?: string;
  phoneNumber?: string;
  photoURL?: string;
  facebookURL?: string;
  twitterURL?: string;
  linkedInURL?: string;
  instagramURL?: string;
}

export interface PricingCondition {
  defaultRegion: RegionalPricing;
  regions: RegionalPricing[];
}

export interface RegionalPricing {
  name: string;
  amount: number;
  currencyCode: string;
  countryCode: string;
  flag?: string;
}
