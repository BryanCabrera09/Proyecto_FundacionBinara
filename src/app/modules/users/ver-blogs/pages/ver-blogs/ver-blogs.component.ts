import { DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';
import { Blogscomentariospost } from 'src/app/core/models/blogcomentariospost';
import { Blogcomentarios } from 'src/app/core/models/blogcommentarios';
import { Blogs } from 'src/app/core/models/blogs';
import { Blogpost } from 'src/app/core/models/blogpost';
import { BlogsService } from 'src/app/core/services/blogs.service';
import { BlogsComponent } from '../../../blogs/pages/blogs/blogs.component';
import { ComentariosService } from 'src/app/core/services/comentarios.service';
import { __param } from 'tslib';

@Component({
  selector: 'app-ver-blogs',
  templateUrl: './ver-blogs.component.html',
  styleUrls: ['./ver-blogs.component.scss']
})
export class VerBlogsComponent implements OnInit {

  blogs!: Blogs;
  comentarios!: Blogcomentarios[];

  editarBlog!: BlogsComponent;

  //Declaracion de datos
  id_blog?: number;
  nombre?: string = '';
  fecha?: string = '';
  comentario?: string = '';

  visible: boolean = true;

  blogpost: Blogpost = new Blogpost();
  blogedit: any;
  edit: boolean = false;

  blogcomentario: Blogscomentariospost = new Blogscomentariospost();

  constructor(private dialogRef: MatDialogRef<VerBlogsComponent>, 
    private router: Router, private snackBar: MatSnackBar, 
    private comentariosService: ComentariosService, 
    private dialog:MatDialog, 
    private route: ActivatedRoute, 
    private blogsService: BlogsService, 
    @Inject(MAT_DIALOG_DATA) public data: any){

    if(data.blogcomentario != null){
      this.id_blog = data.blogcomentario.id_blog;
      this.nombre = data.blogcomentario.nombre;
      this.fecha = data.blogcomentario.fecha;
      this.comentario = data.blogcomentario.comentario;
    }
  }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    this.buscarBlogPorId(id!);
    this.getForm();
  
  }

  onClose(): void {
    var popup = document.getElementById("-comentario");
    var botonGuardar = document.getElementById("publicar");
    botonGuardar?.addEventListener("click", function () {
      window.close;
    });
  }

  //Buscar Blog por Id para mostrar en pantalla
  buscarBlogPorId(id: String): void {
    this.blogsService.searchBlogById(id).subscribe({
      next: (data: any) => {
        const blogs = data;
        console.log(blogs);
        this.blogs = blogs.blogs;
        console.log(this.blogs.titulo);
        
      },
      error: (error: any) => {
        console.error('Error obteniendo el blog:', error);
      },
      complete:() => {
        console.log('Busqueda de blog por ID completada')
      },
    });
  }
  
  //LLama a popup para crear comentarios
  getForm(): void{
    var btnAbrirPopup = document.getElementById('btn-abrir-popup-comentario'),
    overlay = document.getElementById('overlay-comentario'),
    popup = document.getElementById('popup-comentario'),
    btnCerrarPopup = document.getElementById('btn-cerrar-popup-comentario');

    btnAbrirPopup?.addEventListener('click', function(){
      overlay?.classList.add('active');
      popup?.classList.add('active');
    });

    btnCerrarPopup?.addEventListener('click', function(){
      overlay?.classList.remove('active');
      popup?.classList.remove('active');
    });
  }

  //Datos
  Datos(): void{
    //this.blogcomentario._id = this.id_blog;
    this.blogcomentario.nombre = this.nombre;
    this.blogcomentario.comentario = this.comentario;
  }
    //Crear Comentario
    guardarComentario(){
      this.Datos();
      this.comentariosService.createComentario(this.blogcomentario).subscribe(
        (response) => {
          console.log('Comentario publicado con éxito', response);

          this.onClose();
          window.location.reload();
        },
        (error) => {
          console.error('Error de guardar comentario', error);
        }
      );
    }

    openSuccessSnackBar(){
      this.snackBar.open('Comentario registrado con éxito', 'cerrar',{
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['success-snackbar']
      });
    }

    //Abrir formulario para crear nuevo blog
  editar(): void {
    var btnAbrirPopup = document.getElementById('btn-abrir-popup'),
      overlay = document.getElementById('overlay'),
      popup = document.getElementById('popup'),
      btnCerrarPopup = document.getElementById('btn-cerrar-popup');

    btnAbrirPopup?.addEventListener('click', function () {
      overlay?.classList.add('active');
      popup?.classList.add('active');
    });

    var titulo = document.getElementById('titulo');

    titulo = this.blogs.titulo;

    btnCerrarPopup?.addEventListener('click', function () {
      overlay?.classList.remove('active');
      popup?.classList.remove('active');
    });
  }
}
