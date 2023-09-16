import { Injectable } from '@angular/core';
import baserUrl from '../helpers/helperUrl';
import { HttpClient } from '@angular/common/http';
import { Actividades } from '../models/actividades';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  activitytsUrl = `${baserUrl}/actividad`;

  constructor(private http: HttpClient) { }

  createActivity(actividad: Actividades) {  /* Registrar Actividades */
    return this.http.post(this.activitytsUrl, actividad);
  }

  editActivity(id: string, actividad: Actividades): Observable<any> {   /* Editar Actividades */
    return this.http.put(`${this.activitytsUrl}/${id}`, actividad);
  }

  getActivity(): Observable<Actividades[]> {    /* Obtener listado completo de Actividades */
    return this.http.get<Actividades[]>(`${this.activitytsUrl}/`);
  }

  getActiveActivity(): Observable<Actividades[]> {    /* Obtener listado de Actividades activos */
    return this.http.get<Actividades[]>(`${this.activitytsUrl}/visibles`);
  }

  getActivityxProyecto(id: String): Observable<Actividades[]> {    /* Obtener listado de Actividades x proyecto */
    return this.http.get<Actividades[]>(`${this.activitytsUrl}/xproyecto/${id}`);
  }

  searchActivity(id: String) {   /* Buscar Actividades en base al id */
  return this.http.get(`${this.activitytsUrl}/${id}`);
}

deleteActivity(id: number) {   /* Eliminar Actividades*/
  return this.http.delete(`${this.activitytsUrl}/${id}`)
}

activarActividad(id: number): Observable<any> {
  // Realiza la solicitud PUT para activar el proyecto
  return this.http.put(`${this.activitytsUrl}/${id}/activar`, {});
}


}
