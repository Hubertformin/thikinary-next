import {UserModel} from './user-model';

export interface ArticleModel {
  id?: string;
  title?: string;
  content?: string;
  coverImageURL?: string;
  tags?: string[];
  text?: string;
  author?: UserModel;
  authorUID?: string;
  reads?: number;
  comments?: Comment[];
  commentsCount?: number;
  minsRead?: number;
  fileId?: string; // imagekit upload file id, used to delete image from imagekit
  thumbnails?: {
    small: string;
    medium: string;
    large: string;
    placeholder?: string;
  };
  // imageURLS?: any[];
  shareUrl?: string;
  date?: Date;
  urlID?: string;
}

export interface ArticleMeta extends ArticleModel {
  savedDate: Date;
}
