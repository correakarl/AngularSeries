import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Serie } from '../common/serie';

@Injectable({
  providedIn: 'root'
})

export class SerieService {

  baseURL = 'http://localhost:3000/api/series';

  constructor(
    private http: HttpClient
  ) { }

  getSeriesList(): Observable<Serie[]> {
    return this.http.get<Serie[]>(this.baseURL);
  }


}
