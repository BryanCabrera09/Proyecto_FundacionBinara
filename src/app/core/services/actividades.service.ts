import { Injectable } from '@angular/core';
import baserUrl from '../helpers/helperUrl';
import { HttpClient } from '@angular/common/http';
import { Actividades } from '../models/actividades';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  projectsUrl = `${baserUrl}/proyecto`;

  constructor(private http: HttpClient) { }

  createActivity(actividad:Actividades) {  /* Registrar Actividades */
    return this.http.post(this.projectsUrl, actividad);
  }

  editActivity(id: string, actividad:Actividades): Observable<any> {   /* Editar Actividades */
    return this.http.put(`${this.projectsUrl}/${id}`, actividad);
  }
}
