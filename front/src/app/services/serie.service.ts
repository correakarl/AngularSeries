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

  getSerie(id: string): Observable<Serie>{
    return this.http.get<Serie>(this.baseURL+'/'+id);
  }

  updateSerie(id: string, serie: Serie): Observable<any> {
    return this.http.put(this.baseURL+'/'+id, serie);
  }

  addSerie(serie: Serie): Observable<any> {
    return this.http.post(this.baseURL, serie);
  }

  removeSerie(id: string): Observable<any> {
    return this.http.delete(this.baseURL+'/'+id);
  }

}
