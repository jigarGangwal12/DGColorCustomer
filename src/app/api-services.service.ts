import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiServicesService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll(url: string, body: any): Observable<any> {
    return this.http.get(this.apiUrl + url, { params: body }).pipe(
      map((data) => { return this.extractData(data, false); }),
      catchError(this.handleError)
    );
  }

  getById(url: string, id: any): Observable<any> {
    return this.http.get(this.apiUrl + url + '/' + id).pipe(
      map((data) => { return this.extractData(data, false); }),
      catchError(this.handleError)
    );
  }

  post(url: string, body: any, showSuccessMessage?: boolean): Observable<any[]> {
    return this.http.post(this.apiUrl + url, body).pipe(
      map((data) => { return this.extractData(data, showSuccessMessage); }),
      catchError(this.handleError)
    );
  }

  put(url: string, body: any, showSuccessMessage?: boolean): Observable<any[]> {
    return this.http.put(this.apiUrl + url, body).pipe(
      map((data) => { return this.extractData(data, showSuccessMessage); }),
      catchError(this.handleError)
    );
  }

  deleteById(url: string, id: any, showSuccessMessage?: boolean): Observable<any[]> {
    return this.http.delete(this.apiUrl + url + '/' + id).pipe(
      map((data) => { return this.extractData(data, showSuccessMessage); }),
      catchError(this.handleError)
    );
  }

  private extractData(res: any, showSuccessMessage?: boolean) {
    const body = res;
    return body;
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error.message || error);
    return throwError(error.message || error);
  }
}
