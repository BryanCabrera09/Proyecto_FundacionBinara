import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import baserUrl from 'src/app/core/helpers/helperUrl';
import { Blogs } from 'src/app/core/models/blogs';
import { Proyectos } from 'src/app/core/models/proyectos';
import { BlogsService } from 'src/app/core/services/blogs.service';
import { ProyectosService } from 'src/app/core/services/proyectos.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  projects?: Proyectos[];

  displayedProjects?: any[];
  displayedBlogs?: any[];

  baseUrl: string = baserUrl;
  roluser: string = "ADMIN_ROLE"

  blogs?: Blogs[];

  bodyAuth: any = {};
  userRole?: string;

  sliderImages: string[] = ["s1.jpg", "s2.jpg", "s3.jpg", "s4.jpg"];
  currentIndex: number = 0;

  selectedLink: string = 'url(assets/img/portada_binara.png)';

  /* Contenido Extenso */
  /* Sabias que */
  sabias = 'Aunque se conoce como “Tierra”, nuestro planeta es más de 70% agua y casi 30% tierra. Por eso'
    + 'también recibe el nombre de “planeta azul”, ya que, desde el espacio, se ve como una gran masa de este'
    + 'color. De toda esta agua, el 96,5% está en los océanos y el otro 3,5% en forma de agua dulce y hielo.';

  /* Quienes Somos */
  quienes_somos_parrU = 'Fundación BINARA es una persona jurídica de derecho privado, sin fines de lucro, con'
    + 'patrimonio propio, administración autónoma, constituida en 2022 ante el Ministerio'
    + 'de Agua, Ambiente y Transición Ecológica del Ecuador.'
  quienes_somos_parrD = 'En alianza con empresas privadas, donantes particulares, agencias de cooperación y'
    + 'gobiernos nacionales y locales potenciamos el trabajo de organizaciones sin fines de'
    + 'lucro; micro, pequeñas y medianas empresas; fondos de agua; redes, asociaciones y'
    + 'cooperativas de la economía popular y solidaria; pequeños y medianos productores'
    + 'agrícolas; organizaciones indígenas; y, colectivos urbanos mediante la canalización de'
    + 'recursos monetarios y no monetarios para proteger, conservar y restaurar ecosistemas'
    + 'y servicios ecosistémicos clave para las poblaciones que dependen de ellos.';
  /* Mision */
  mision = 'Proteger la biodiversidad del Ecuador y a las comunidades que dependen de ella.'
    + 'Para eso, trabajamos en conjunto con las y los pobladores locales de los ecosistemas'
    + 'más importantes para la vida en Ecuador en la búsqueda de medios de vida dignos y'
    + 'sustentables para sus familias. Su desarrollo integral y sustentable es nuestra prioridad.'
    + 'Perseguimos fines sociales y no participamos, bajo ningún concepto, en asuntos de'
    + 'política partidista o religiosa, coordinamos nuestras actividades con otras personas'
    + 'naturales o jurídicas, nacionales y extranjeras, bajo los principios de libre asociación y'
    + 'autodeterminación.';
  /* Vision */
  vision = 'Proteger, conservar y restaurar ecosistemas y servicios ecosistémicos clave'
    + 'para las poblaciones que dependen de ellos, mediante la canalización de recursos'
    + 'monetarios y no monetarios a través de alianzas con empresas privadas, donantes'
    + 'particulares, agencias de cooperación y gobiernos nacionales y locales.'
  /* Sobre Nosotros */
  nosotros = 'Trabajamos incansablemente para promover la sostenibilidad ambiental y el bienestar de'
    + 'las comunidades que interactúan con el entorno natural.\nNuestra labor abarca diversas'
    + 'iniciativas, desde proyectos de reforestación hasta la implementación de prácticas agrícolas'
    + 'sostenibles y la conservación de ecosistemas acuáticos.';


  constructor(private router: Router, private projectService: ProyectosService, private blogsService: BlogsService) { }

  ngOnInit() {

    this.listProjects();
    this.getActiveBlogsList();

    let token = sessionStorage.getItem('token') as string;
    this.bodyAuth = this.decodeJwt(token);
    //console.log('BodyAuth', this.bodyAuth);

    this.userRole = this.bodyAuth.usuario.rol;
    //console.log(this.userRole);
  }

  listProjects() {
    this.projectService.getProjects().subscribe(
      data => {
        this.projects = data;
        this.displayedProjects = this.projects.slice(0, 3);
      });
  }

  //Listar blogs
  getActiveBlogsList(): void {
    this.blogsService.getBlogs().subscribe(
      blogs => {
        this.blogs = blogs;
        this.displayedBlogs = this.blogs.slice(0, 3);
      },
      error => {
        console.error('Error obteniedo blogs:', error);
      }
    );
  }

  listBlogs() {
    console.log("this.blogs")
    this.blogsService.getBlogs().subscribe(data => {
      this.blogs = data;
      this.displayedBlogs = this.blogs.slice(0, 3);
    })
  }

  onDivClick(blogId: number | undefined) {
    if (blogId !== undefined) {
      this.router.navigate(['user/ver-blogs', blogId]);
    }
  }

  /*  changeImage() {
     const background = document.querySelector('.background') as HTMLElement;
     background.style.backgroundImage = `url('assets/slider/${this.sliderImages[this.currentIndex]}')`;
     this.currentIndex = (this.currentIndex + 1) % this.sliderImages.length;
   }
 
   startSlider() {
     setInterval(() => {
       this.changeImage();
     }, 2000);
   } */

  decodeJwt(token: string): any {

    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  getProvincia(lugar: any): string {
    return lugar.split(';')[0];
  }

  goToArticle(projectId: any) {
    if (projectId !== undefined) {
      this.router.navigate(['user/ver/proyecto', projectId]);
    } else {
      console.log(projectId);
    }
  }

  goToProjects(){
    this.router.navigate(['/user/projects']);
  }

}
