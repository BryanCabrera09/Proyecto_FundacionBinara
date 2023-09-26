import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Blogpost } from 'src/app/core/models/blogpost';
import { Blogs } from 'src/app/core/models/blogs';
import { BlogsService } from 'src/app/core/services/blogs.service';
import { VerBlogsComponent } from '../../../ver-blogs/pages/ver-blogs/ver-blogs.component';
import Swal from 'sweetalert2';
import baserUrl from 'src/app/core/helpers/helperUrl';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})

export class BlogsComponent implements OnInit{

  blogs?: Blogs[];
  baseUrl: string = baserUrl;

  //Declaracion de datos
  titulo: string = '';
  imagen: any = "link de imagen";
  nombre_autor: string = '';
  apellido_autor: string = '';
  email_autor: string = '';
  parrafo: string = '';
  bibliografia: string = '';

  visible: boolean = true;
  novisible: boolean = false;

  blog: Blogpost = new Blogpost();

  constructor(private dialogRef: MatDialogRef<BlogsComponent>, 
    private router: Router, 
    private snackBar: MatSnackBar, 
    private blogsService: BlogsService,  
    @Inject(MAT_DIALOG_DATA) public data: any,
    public storageServ: StorageService){
      
    if(data.blog != null){
      this.titulo = data.blog.titulo;
      this.imagen = data.blog.imagen;
      this.imageSrc = data.blog.imagen;
      this.nombre_autor = data.blog.nombre_autor;
      this.apellido_autor = data.blog.apellido_autor;
      this.email_autor = data.blog.email_autor;
      this.parrafo = data.blog.parrafo;
      this.bibliografia = data.blog.bibliografia;
    }
  }

  ngOnInit() {

    this.getForm();
    this.textarea();
    this.getActiveBlogsList();
  }

  //Click en div para abrir blog
 onDivClick(blogId: number | undefined){
   if (blogId !== undefined) {
     this.router.navigate(['user/ver-blogs', blogId]);
   }
  }

  //Abrir formulario para crear nuevo blog
  getForm(): void {
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
    });
  }

  //Redimensionar textarea auto
  textarea(): void {

    // Selecciona todos los elementos con la clase "textarea"
    var elementos = document.querySelectorAll<HTMLElement>('.textarea-auto');

    // Itera a través de los elementos y modifica las dimensiones
    elementos.forEach(function (elemento) {
      elemento.addEventListener('input', function () {
        this.style.height = 'auto'; // Restablecer la altura a automática
        this.style.height = (this.scrollHeight) + 'px'; // Establecer la altura según el contenido

      });
    });


  }

//Previsualizar imagen
imageSrc: string | ArrayBuffer | null = null;
  onFileSelected(event: any): void {
    const input = event.target;
    if(input.files && input.files[0]){
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
        this.imagen = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  //Listar blogs
  getActiveBlogsList(): void {
    this.blogsService.getBlogs().subscribe(
      blogs => { 
        this.blogs = blogs;
      },
      error => { 
        console.error('Error obteniedo blogs:', error);
      }
    );
  }

  listBlogs(){
    console.log("this.blogs")
    this.blogsService.getBlogs().subscribe( data => {
      this.blogs = data;
    })
  }

  onClose(): void {
    var popup = document.getElementById("overlay");
    var botonGuardar = document.getElementById("publicar");
    botonGuardar?.addEventListener("click", function () {
      window.close;
    });
  }
  
  Datos(): void{
    this.blog.titulo = this.titulo;
    this.blog.foto = this.imagen; 
    this.blog.nombre_autor = this.nombre_autor;
    this.blog.apellido_autor = this.apellido_autor;
    this.blog.email_autor = this.email_autor;
    this.blog.parrafo = this.parrafo;
    this.blog.bibliografia = this.bibliografia;
    this.blog.visible = this.visible;
  }

  publicarBlog(){
    this.Datos();
    this.blogsService.createBlog(this.blog).subscribe(
      (response:any) => {
        this.subirimagen(response.blog._id);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '<success>Blog creado con éxito!</seccess>',
          showConfirmButton: false,
          timer: 3000
        });

        this.onClose();
        window.location.reload();
      },
      (error) => {
        console.error('Error al registrar blog', error);
        console.log(this.blog.foto)
      }
    );
  }

  guardarSinPublicarBlog(){
    this.Datos();
    this.blog.visible = this.novisible;
    this.blogsService.createBlog(this.blog).subscribe(
      (response) => {
        console.log('Blog registrado con exito', response);

        this.onClose();
        window.location.reload();
      },
      (error) => {
        console.error('Error al registrar blog', error);
        console.log(this.blog.foto)
      }
    );
  }

  openSuccessSnackBar(){
    this.snackBar.open('Blog registrado con éxito', 'cerrar',{
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
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

}
