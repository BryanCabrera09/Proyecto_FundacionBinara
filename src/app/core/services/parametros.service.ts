import { Injectable } from '@angular/core';
import baserUrl from '../helpers/helperUrl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parametro } from '../models/parametros';
import { Parametropost } from '../models/parametropost';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {
  
  pimgUrl = `${baserUrl}/imagen/parametro`;

  projectsUrl = `${baserUrl}/parametro`;

  constructor(private http: HttpClient) { }
 

  crearpa(parametro :Parametropost){
    return this.http.post(this.projectsUrl,parametro);
  }


  editparm(id: string, parametro:Parametropost):Observable<any>{
    return this.http.put(`${this.projectsUrl}/${id}`, parametro);
  } 

  

  listparm(): Observable<Parametro[]> {
    return this.http.get<Parametro[]>(`${this.projectsUrl}/`);
  }


  buscarparam(id: string){
    return this.http.get(`${this.projectsUrl}/${id}`);
  }

  guardarImagen(id: string, imagenData: File) {

    const formData = new FormData();
    formData.append('archivo', imagenData);

    const headers = new HttpHeaders();

    const url = `${this.pimgUrl}/${id}`;

    return this.http.post(url, formData, { headers });
  }

  findByLlave(llave: string): Observable<any> {
    return this.http.get(this.projectsUrl + `/llave/${llave}`);
  }

}
