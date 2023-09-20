import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import baserUrl from '../helpers/helperUrl';
import { Proyectos } from '../models/proyectos';
import { Observable } from 'rxjs';
import { Proyectospost } from '../models/proyectospost';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  projectsUrl = `${baserUrl}/proyecto`;

  constructor(private http: HttpClient) { }

  createProject(proyecto: Proyectospost) {  /* Registrar Proyectos */
    return this.http.post(this.projectsUrl , proyecto);
  }

  editProject(id: string, proyecto: Proyectospost): Observable<any> {   /* Editar Proyectos */
    return this.http.put(`${this.projectsUrl}/${id}`, proyecto);
  }

  getProjects(): Observable<Proyectos[]> {    /* Obtener listado completo de proyectos */
    return this.http.get<Proyectos[]>(`${this.projectsUrl}/`);
  }

  getActiveProjects(): Observable<Proyectos[]> {    /* Obtener listado de proyectos activos */
    return this.http.get<Proyectos[]>(`${this.projectsUrl}/visibles`);
  }

  searchProject(id: String) {   /* Buscar proyectos en base al id */
    return this.http.get(`${this.projectsUrl}/${id}`);
  }

  deleteProject(id: number) {   /* Eliminar proyectos*/
    return this.http.delete(`${this.projectsUrl}/${id}`)
  }
  
  activarProyecto(id: number): Observable<any> {
    // Realiza la solicitud PUT para activar el proyecto
    return this.http.put(`${this.projectsUrl}/${id}/activar`, {});
  }

  editarmapa(mapas: string[],id:string): Observable<any> {
    const body = { mapas };
    return this.http.put<any>(this.projectsUrl + "/"+id, body);
  }

  uploadImage(projectId: string, file: File) {
    const formData = new FormData();
    formData.append('archivo', file);

    const headers = new HttpHeaders();

    const url = `${baserUrl}/imagen/proyecto/${projectId}`;

    return this.http.post(url, formData, { headers });
  }

}
