import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import baserUrl from "../helpers/helperUrl";
import { Blogcomentarios } from "../models/blogcommentarios";
import { Observable } from "rxjs";
import { Blogscomentariospost } from "../models/blogcomentariospost";

@Injectable({
    providedIn: 'root'
})
export class ComentariosService {

    comentariosUrl = `${baserUrl}/comentario`;

    constructor(private http:HttpClient) {}

    //Registrar un nuevo comentario
    createComentario(comentario: Blogcomentarios) {
        return this.http.post(this.comentariosUrl, comentario);
    }

    //Listar comentarios
    getComentarios(): Observable<Blogcomentarios[]> {
        return this.http.get<Blogcomentarios[]>(`${this.comentariosUrl}/ver-blogs`);
    }

    //Eliminar comentario
    deleteCometario(id: number) {
        return this.http.delete(`${this.comentariosUrl}/ver-blogs/${id}`);
    }
}