import {User} from 'firebase';

interface UserSettings {
  emailNotifications: boolean;
}

export interface UserModel {
  id?: string;
  uid?: any;   // the firebase auth ID
  // name?: string;
  displayName?: string;
  email?: string;
  phoneNumber?: string;
  photoURL?: string;
  gender?: string;
  password?: string;
  dateOfBirth?: Date;
  articlesCount?: number;
  followersCount?: number;
  followingCount?: number;
  facebook?: string;
  twitter?: string;
  settings?: UserSettings;
  // instagram?: string;
  // linkedin?: string;
  about?: string;
  date?: string;
}

export interface UserWithClaims extends User {
  customClaims: {
    editor: boolean;
    admin: boolean;
  };
}
