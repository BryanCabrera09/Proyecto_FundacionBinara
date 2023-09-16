import { DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Blogscomentariospost } from 'src/app/core/models/blogcomentariospost';
import { Blogcomentarios } from 'src/app/core/models/blogcommentarios';
import { Blogs } from 'src/app/core/models/blogs';
import { BlogsService } from 'src/app/core/services/blogs.service';
import { ComentariosService } from 'src/app/core/services/comentarios.service';

@Component({
  selector: 'app-ver-blogs',
  templateUrl: './ver-blogs.component.html',
  styleUrls: ['./ver-blogs.component.scss']
})
export class VerBlogsComponent {

  blogs!: Blogs;

  //blogcomentario!: Blogcomentarios[];

  //Declaracion de datos
  id_blog?: number;
  nombre?: string = '';
  email?: string = '';
  fecha?: string = '';
  comentario?: string = '';

  visible: boolean = true;

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
      this.email = data.blogcomentario.email;
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
    this.dialogRef.close();
  }

  Datos(): void{
    //this.blogcomentario._id = this.id_blog;
    this.blogcomentario.nombre = this.nombre;
    this.blogcomentario.email = this.email;
    this.blogcomentario.comentario = this.comentario;
  }

  //publicarComentario
  guardarComentario(){
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

  

  //Buscar
  buscarBlogPorId(id: String):void {
    this.blogsService.searchBlogById(id).subscribe({
      next: (data: any) => {
        this.blogs = data;
        console.log(this.blogs);
      },
      error: error => {
        console.error('Error obteniendo el blog:', error);
      }
    });
  }

  // ngAfterViewInit() {
  //   const id = this.route.snapshot.paramMap.get('id');
  //   this.buscarBlogPorId(id!);
  // }

  
  //LLama a popup para enviar comentarios
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



  //Guardar comentarios

}
