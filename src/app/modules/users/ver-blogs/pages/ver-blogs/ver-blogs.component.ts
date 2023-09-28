import { DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild, Inject, OnInit, Input } from '@angular/core';
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
import Swal from 'sweetalert2';
import { style } from '@angular/animations';
import { StorageService } from 'src/app/core/services/storage.service';
import { Usuario } from 'src/app/core/models/usuario';
import { UsuarioService } from 'src/app/core/services/usuario.service';


@Component({
  selector: 'app-ver-blogs',
  templateUrl: './ver-blogs.component.html',
  styleUrls: ['./ver-blogs.component.scss']
})
export class VerBlogsComponent implements OnInit {

  blogs!: Blogs;
  comentarios!: Blogcomentarios[];
  blog: Blogpost = new Blogpost();
  user?: Usuario;

  editarBlog!: BlogsComponent;

  //Declaracion de datos
  id_blog?: number;
  nombre?: string = '';
  fecha?: string = '';
  comentario: string[] = [''];
  idEditar?: string = '';

  visible: boolean = true;

  blogpost: Blogpost = new Blogpost();
  blogedit: string = '';
  edit: boolean = false;

  blogcomentario: Blogcomentarios = new Blogcomentarios();

  constructor(private dialogRef: MatDialogRef<VerBlogsComponent, BlogsComponent>,
    private router: Router,
    private snackBar: MatSnackBar,
    public storageServ: StorageService,
    private comentariosService: ComentariosService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private blogsService: BlogsService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    if (data.blog != null) {
      this.blogedit = data.blog._id;

    }

    if (data.blogcomentario != null) {
      this.id_blog = data.blogcomentario.id_blog;
      this.nombre = data.blogcomentario.nombre;
      this.fecha = data.blogcomentario.fecha;
      this.comentario = data.blogcomentario.comentario;
    }
  }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    this.buscarBlogPorId(id!);
    this.buscarUsuario()

    this.getForm();
    this.estado();
  }

  onClose(): void {
    var popup = document.getElementById("-comentario");
    var botonGuardar = document.getElementById("publicar");
    botonGuardar?.addEventListener("click", function () {
      window.close;
    });
  }

  //Buscar Blog por Id para mostrar informacion detallada
  buscarBlogPorId(id: String): void {
    this.blogsService.searchBlogById(id).subscribe({
      next: (data: any) => {
        const blog = data;
        this.blogs = blog.blog;
      },
      error: (error: any) => {
        console.error('Error obteniendo el blog:', error);
      },
      complete: () => {
        console.log('Busqueda de blog por ID completada')
      },
    });
  }

  buscarUsuario() {

    this.user = JSON.parse(sessionStorage.getItem('userdetails') || '');

    this.nombre = this.user?.nombre;
  }

  //LLama a popup para crear comentarios
  getForm(): void {
    var btnAbrirPopup = document.getElementById('btn-abrir-popup-comentario'),
      overlay = document.getElementById('overlay-comentario'),
      popup = document.getElementById('popup-comentario'),
      btnCerrarPopup = document.getElementById('btn-cerrar-popup-comentario');

    btnAbrirPopup?.addEventListener('click', function () {
      overlay?.classList.add('active');
      popup?.classList.add('active');
    });

    btnCerrarPopup?.addEventListener('click', function () {
      overlay?.classList.remove('active');
      popup?.classList.remove('active');
    });
  }

  //Datos

  guardarComentario() {

    this.blogcomentario.usuario = this.user?.uid;
    this.blogcomentario.blog = this.blogs._id;


    this.blogcomentario.visible = true;

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

  openSuccessSnackBar() {
    this.snackBar.open('Comentario registrado con éxito', 'cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  //Abrir formulario para editar blog
  formularioEditar(): void {
    var btnAbrirPopup = document.getElementById('btn-abrir-popup'),
      overlay = document.getElementById('overlay'),
      popup = document.getElementById('popup'),
      btnCerrarPopup = document.getElementById('btn-cerrar-popup');

    btnAbrirPopup?.addEventListener('click', function () {
      overlay?.classList.add('active');
      popup?.classList.add('active');
    });

    btnCerrarPopup?.addEventListener('click', function () {
      overlay?.classList.remove('active');
      popup?.classList.remove('active');

      window.location.reload();
    });
  }

  imageSrc: string | ArrayBuffer | null = null;
  onFileSelected(event: any): void {
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
        this.blogs.foto = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }


  DatosBlog(): void {
    this.blog.titulo = this.blogs.titulo;
    this.blog.foto = this.blogs.foto;
    this.blog.nombre_autor = this.blogs.nombre_autor;
    this.blog.apellido_autor = this.blogs.apellido_autor;
    this.blog.email_autor = this.blogs.email_autor;
    this.blog.parrafo = this.blogs.parrafo;
    this.blog.bibliografia = this.blogs.bibliografia;
    this.blog.visible = this.visible;
  }

  subirimagen(id: string) {
    const base64String = this.blog.foto; // tu cadena base64 aquí
    const byteCharacters = atob(base64String.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/jpeg' });
    const file = new File([blob], 'imagen.jpg', { type: 'image/jpeg' }); // Creando un objeto File

    this.blogsService.uploadImage(id, file).subscribe({ // Usando el objeto File aquí
      next: (response) => {
        console.log('Imagen subida exitosamente', response);
      },
      error: (error) => {
        console.error('Error al subir la imagen', error);
      },
    });
  }

  actualizarBlog() {
    this.DatosBlog();

    this.blogsService.editBlog(this.blogs._id + '', this.blog).subscribe({
      next: response => {
        console.log('Blog actualizado con éxito!', response);
        this.subirimagen(response.blog.uid)
        this.onClose();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '<strong>Blog actualizado con éxito!</strong>',
          showConfirmButton: false,
          timer: 2000
        });
        this.onClose();
        window.location.reload();
      },
      error: error => {
        console.error('Error al actualizar el blog:', error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '<strong>Error al actualizar el blog</strong>' + error,
          showConfirmButton: false,
          timer: 2000
        });
      },
      complete: () => {
        console.log('La operación ha completado');
      }
    });
  }


  estado() {
    const boton = document.getElementById('boton') as HTMLButtonElement;
    let activo = true;

    boton.addEventListener('click', () => {
      if (activo) {
        boton.innerText = 'No visible';
        boton.classList.remove('activo');
        boton.classList.add('inactivo')
        this.blogsService.deleteBlog(this.blogs._id!).subscribe(
          response => {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: '<success>Blog NO VISIBLE</success>',
              showConfirmButton: false,
              timer: 2000
            });
          },
          error => {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: '<strong>Error al desactivar blog</strong>' + error,
              showConfirmButton: false,
              timer: 2000
            });
          }
        );
      } else {
        boton.innerText = 'Visible'
        boton.classList.remove('inactivo');
        boton.classList.add('activo');
        this.DatosBlog()
        this.blogs.visible = true;

        this.blogsService.editBlog(this.blogs._id + '', this.blog).subscribe({
          next: response => {
            console.log('Blog activado con éxito!', response);
            this.subirimagen(response.blog.uid)
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: '<strong>El Blog se encuentra visible!</strong>',
              showConfirmButton: false,
              timer: 2000
            });
          },
          error: error => {
            console.error('Error al activar blog:', error);
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: '<strong>Error al actualizar el blog</strong>' + error,
              showConfirmButton: false,
              timer: 2000
            });
          },
          complete: () => {
            console.log('La operación ha completado');
          }
        });
      }
      activo = !activo;
    });
  }

}