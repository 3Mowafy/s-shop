export interface IUser {
  _id: string;
  name: string;
  slug: string;
  email: string;
  phone?: string;
  address?: string;
  profileImg?: string;
  imageId?: string;
  password?: string;
  role: 'user' | 'admin' | 'SuperAdmin';
  active: boolean;
  createdAt: string;
  updatedAt: string;
  addresses?: string[];
  wishList?: string[];
}
