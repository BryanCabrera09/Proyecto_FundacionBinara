import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from '../helpers/helperUrl';
import { Proyectos } from '../models/proyectos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  projectsUrl = `${baserUrl}/proyecto`;

  constructor(private http: HttpClient) { }

  createProject(proyecto: Proyectos) {  /* Registrar Proyectos */
    return this.http.post(this.projectsUrl + '/', proyecto);
  }

  editProject(id: number, proyecto: Proyectos): Observable<any> {   /* Editar Proyectos */
    return this.http.put(`${this.projectsUrl}/${id}`, proyecto);
  }

  getProjects(): Observable<Proyectos[]> {    /* Obtener listado completo de proyectos */
    return this.http.get<Proyectos[]>(`${this.projectsUrl}/`);
  }

  getActiveProjects(): Observable<Proyectos[]> {    /* Obtener listado de proyectos activos */
    return this.http.get<Proyectos[]>(`${this.projectsUrl}/visibles`);
  }

  searchProject(id: number) {   /* Buscar proyectos en base al id */
    return this.http.get(`${this.projectsUrl}/${id}`);
  }

  deleteProject(id: number) {   /* Eliminar proyectos*/
    return this.http.delete(`${this.projectsUrl}/${id}`)
  }

}
