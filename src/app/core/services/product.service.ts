import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IListResponse } from '@interfaces/general';
import { API_BASE_URL } from '../constants/api-url';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _http: HttpClient) {}

  getAllProducts() {
    return this._http.get(`${API_BASE_URL}products`);
  }

  getSingleProducts(id: string) {
    return this._http.get<any>(`${API_BASE_URL}products/${id}`, {
      withCredentials: true,
    });
  }

  AddProduct(productData: FormData) {
    return this._http.post<any>(`${API_BASE_URL}products`, productData);
  }

  EditProduct(id: string, productData: any) {
    return this._http.put<any>(`${API_BASE_URL}products/${id}`, productData);
  }

  DeleteProduct(id: string) {
    return this._http.delete<any>(`${API_BASE_URL}products/${id}`);
  }
}
