import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiKey = 'S6IXIebUtkndU2RNRaiDzOEFSyI9X6i7';

  constructor(private httpClient: HttpClient) { }

  public getStatus() {
    const headers = new HttpHeaders({
      'API-Key': this.apiKey
    });
    const apiUrl = 'https://api.oglaszamy24.pl/api/hello';
    return this.httpClient.get(apiUrl, {headers});
  }

  public getCategories() {
    const headers = new HttpHeaders({
      'API-Key': this.apiKey
    });
    const apiUrl = 'https://api.oglaszamy24.pl/api/categories';
    return this.httpClient.get(apiUrl, {headers});
  }

  public getCities() {
    const headers = new HttpHeaders({
      'API-Key': this.apiKey,
      'Content-Type': 'application/json'
    });
    const apiUrl = 'https://api.oglaszamy24.pl/api/cities';
    return this.httpClient.get(apiUrl, {headers});
  }
}
