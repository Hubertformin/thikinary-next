
export interface SettingsModel {
   articleMeta: ArticlesMeta;
}

export interface ArticlesMeta {
  id?: string;
  count: number;
  date?: Date;
}
