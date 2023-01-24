import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {QueryParams} from "./type";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    private _http: HttpClient,
    private _router: Router,
  ) {
  }

  errorMessage = '';

  private _createDefaultHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    });
    return headers;
  }

  private _removeNullParams(params: QueryParams | undefined): {} | null {
    if (!params) {
      return null;
    }

    return Object.entries(params).reduce(
      (a: QueryParams, [k, v]) => (v === null ? a : ((a[k] = v), a)),
      {},
    );
  }

  public getData<R>(
    url: string,
    params?: QueryParams,
  ): Observable<R> {
    return this._http
      .get<R>(url, {
        headers: this._createDefaultHeaders(),
        params: this._removeNullParams(params) || undefined,
      })
      .pipe(
        catchError<any, any>((err: HttpErrorResponse) =>
          this._handleError(err),
        ),
      );
  }

  public putData<R>(
    url: string,
    body?: {},
    params?: QueryParams,
  ): Observable<R> {
    return this._http
      .put<R>(url, body, {
        headers: this._createDefaultHeaders(),
        params: this._removeNullParams(params) || undefined,
      })
      .pipe(
        catchError<any, any>((err: HttpErrorResponse) =>
          this._handleError(err),
        ),
      );
  }

  public postData<R>(
    url: string,
    body?: {},
    params?: QueryParams,
  ): Observable<R> {
    return this._http
      .post<R>(url, body, {
        headers: this._createDefaultHeaders(),
        params: this._removeNullParams(params) || undefined,
      }).pipe(
        catchError<any, any>((err: HttpErrorResponse) =>
          this._handleError(err),
        ),
      );
  }

  public async postDataDev(url: string, _reqName: string, headers?: {}, body?: {}) {
    // @ts-ignore
    return await fetch(url, {method: 'POST', mode: 'no-cors', cache: 'no-cache', headers: headers, body: JSON.stringify(body)})
    // .then((res) => {
//   if (res.status === 200) {
//   switch (_reqName) {
//   case ("login"): sessionStorage.setItem('token', JSON.stringify(res.json())); break;
//   case ("logout"): sessionStorage.removeItem('token'); break;
//   case ("add"): { // @ts-ignore
//     pointDB: TableString = JSON.stringify(res.json());
//     this._svg.items.push(pointDB); break;
//     }
//   }
// }
// }
  }


// )

  public deleteData<R>(
    url: string,
    params?: QueryParams,
  ): Observable<R> {
    return this._http
      .delete<R>(url, {
        headers: this._createDefaultHeaders(),
        params: this._removeNullParams(params) || undefined,
      })
      .pipe(
        catchError<any, any>((err: HttpErrorResponse) =>
          this._handleError(err),
        ),
      );
  }

  private _handleError(e: HttpErrorResponse) {
    switch (e.status) {
      case 405: this.errorMessage = 'Для получения доступа к данной странице необходимо авторизоваться'; break;
      default: this.errorMessage = e.message
    }
    this._router.navigate(['error-page', this.errorMessage]);
  }
}
