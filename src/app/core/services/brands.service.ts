import { Injectable } from '@angular/core';

import { IBrand } from '@interfaces/brands';
import { API_BASE_URL, brands } from '@constants';
import { IQueryParams } from '@interfaces/general';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  constructor(private _generlServise: GeneralService<IBrand>) {}

  getBrands(params?: IQueryParams) {
    return this._generlServise.getAll(`${API_BASE_URL}${brands.base}`, params);
  }

  getBrand(id: string) {
    return this._generlServise.getById(`${API_BASE_URL}${brands.base}`, id);
  }

  addBrand(brand: FormData) {
    return this._generlServise.create(`${API_BASE_URL}${brands.base}`, brand);
  }

  updateBrand(brand: FormData, id: string) {
    return this._generlServise.update(
      `${API_BASE_URL}`,
      `${brands.byId(id)}`,
      brand
    );
  }

  deleteBrand(id: string) {
    return this._generlServise.delete(`${API_BASE_URL}`, `${brands.byId(id)}`);
  }
}
