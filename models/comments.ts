import {UserModel} from './user-model';
import {ArticleModel} from './articles';

export interface ArticleComment {
  id?: string;
  content?: string;
  author?: UserModel;
  photoURL?: string;
  articleSnap?: ArticleModel;
  children?: ArticleComment[];
  date?: string;
}
