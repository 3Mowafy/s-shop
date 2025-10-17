import { IBrand } from "./ibrand";

export interface IAddBrandSend {
  name: string;
  image?: string;
}

export interface IAddBrandResponse {
  status: string;
  data: IBrand;
}
