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

    comentariosUrl = `${baserUrl}/ver-blogs`;

    constructor(private http:HttpClient) {}

    //Registrar un nuevo comentario
    createComentario(comentario: Blogscomentariospost) {
        return this.http.post(this.comentariosUrl, comentario);
    }

    //Listar comentarios
    getComentarios(): Observable<Blogcomentarios[]> {
        return this.http.get<Blogcomentarios[]>(`${this.comentariosUrl}/`);
    }

    //Eliminar comentario
    deleteCometario(id: number) {
        return this.http.delete(`${this.comentariosUrl}/${id}`);
    }
}