import { Injectable } from "@angular/core";
import baserUrl from "../helpers/helperUrl";
import { HttpClient } from "@angular/common/http";
import { Mapas } from "../models/mapas";

@Injectable({
    providedIn: 'root'
  })
export class MapasService{
    projectsUrl = `${baserUrl}/mapa`;

  constructor(private http: HttpClient) { }

  createMap(mapa: Mapas) {  
    return this.http.post(this.projectsUrl , mapa);
  }
}