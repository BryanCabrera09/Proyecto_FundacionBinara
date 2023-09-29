import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import baserUrl from 'src/app/core/helpers/helperUrl';
import { Blogs } from 'src/app/core/models/blogs';
import { Proyectos } from 'src/app/core/models/proyectos';
import { BlogsService } from 'src/app/core/services/blogs.service';
import { ParametrosService } from 'src/app/core/services/parametros.service';
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


  aboutUs: any;
  mission: any;
  vision: any;


  constructor(private router: Router, private projectService: ProyectosService, private blogsService: BlogsService,
    private parametroServ: ParametrosService) { }

  ngOnInit() {
    this.getAboutUs();
    this.getMission();
    this.getVision();

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

  goToProjects() {
    this.router.navigate(['/user/projects']);
  }

  getAboutUs() {
    this.parametroServ.findByLlave("aboutUs").subscribe(
      (res) => {
        this.aboutUs = res.parametros[0]
      }
    )
  }

  getMission() {
    this.parametroServ.findByLlave("mission").subscribe(
      (res) => {
        this.mission = res.parametros[0]
      }
    )
  }

  getVision() {
    this.parametroServ.findByLlave("vision").subscribe(
      (res) => {
        this.vision = res.parametros[0]
      }
    )

  }

}
