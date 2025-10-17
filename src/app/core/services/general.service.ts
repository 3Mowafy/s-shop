import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IListResponse,
  IQueryParams,
  ISingleResponse,
} from '@interfaces/general';

@Injectable({
  providedIn: 'root',
})
export class GeneralService<T> {
  constructor(private _http: HttpClient) {}

  private authOptions() {
    const accessToken = localStorage.getItem('accessToken');
    const headers = accessToken
      ? new HttpHeaders({ Authorization: `Bearer ${accessToken}` })
      : undefined;
    return { withCredentials: true, headers };
  }

  getAll(url: string, params?: IQueryParams) {
    let queryParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach((key) => {
        const value = params[key];
        queryParams = queryParams.set(key, value);
      });
    }
    return this._http.get<IListResponse<T>>(url, {
      params: queryParams,
      ...this.authOptions(),
    });
  }

  getById(url: string, id: string) {
    return this._http.get<ISingleResponse<T>>(`${url}/${id}` , this.authOptions());
  }

  create(url: string, body: FormData | object) {
    return this._http.post<T>(`${url}`, body, this.authOptions());
  }

  update(url: string, id: string, body: FormData) {
    return this._http.put<T>(`${url}${id}`, body, this.authOptions());
  }

  delete(url: string, id: string) {
    return this._http.delete<{ message: string }>(`${url}${id}`, this.authOptions());
  }
}
