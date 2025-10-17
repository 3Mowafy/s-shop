import { ICreatedBy } from "../general/icreatedBy";

export interface IBrand {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  imgId?: string;
  createdBy: ICreatedBy;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}


