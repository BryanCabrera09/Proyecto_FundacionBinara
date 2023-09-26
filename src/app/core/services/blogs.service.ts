import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import baserUrl from "../helpers/helperUrl";
import { Blogs } from "../models/blogs";
import { Observable } from "rxjs";
import { Blogpost } from "../models/blogpost";

@Injectable({
    providedIn: 'root'
})
export class BlogsService {

    blogsUrl = `${baserUrl}/blog`;

    constructor(private http: HttpClient) { }

    //Registrar un nuevo blog
    createBlog(blog: Blogpost) {
        return this.http.post(this.blogsUrl, blog);
    }

    //Editar blog
    editBlog(id: string, blog: Blogpost): Observable<any>{ 
        return this.http.put(`${this.blogsUrl}/${id}`, blog);
    }

    //Listar blogs
    getBlogs(): Observable<Blogs[]> {
        return this.http.get<Blogs[]>(`${this.blogsUrl}/`);
    }

    //Listar blogs activos
    getActiveBlogs(): Observable<Blogs[]> {
        return this.http.get<Blogs[]>(`${this.blogsUrl}/visibles`);
    }

    //Buscar blog por id
    searchBlogById(id: String){
    return this.http.get(`${this.blogsUrl}/${id}`);
  }

    //Eliminar Blog
    deleteBlog(id: number) {
        return this.http.delete(`${this.blogsUrl}/${id}`);
    }

    //Activar blog
    activarBlog(id: number): Observable<any> {
        return this.http.put(`${this.blogsUrl}/${id}/activar`, {});
    }

    uploadImage(blogId: string, file: File) {
        const formData = new FormData();
        formData.append('archivo', file);
    
        const headers = new HttpHeaders();
    
        const url = `${baserUrl}/imagen/blog/${blogId}`;
    
        return this.http.post(url, formData, { headers });
      }
}