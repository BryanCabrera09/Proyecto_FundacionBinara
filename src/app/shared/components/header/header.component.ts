import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userItems } from 'src/app/core/models/dummy-data';
import { LoadScriptService } from 'src/app/core/services/load-script.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isMenuOpen: boolean = false;
  selectedLink: string = '';
  logueado: boolean = false;

  bodyAuthGoogle: any = {};

  userItems = userItems;

  constructor(private router: Router, private loadScriptService: LoadScriptService) {

    /* Damos el nombre del Script que queremos cargar */
    loadScriptService.loadScript(['menu-toggle'])
  }

  ngOnInit() {

    let token = sessionStorage.getItem('token-session') as string;
    this.bodyAuthGoogle = this.decodeToken(token);
    console.log(this.bodyAuthGoogle);

    this.isLogged();
  }

  backgroundImages: { [key: string]: string } = {
    '': 'url("assets/img/portada_binara.png")',
    'Home': 'url("assets/img/portada_binara.png")',
    'Nosotros': 'url("https://di-sitebuilder-assets.s3.amazonaws.com/GMimages/gmMLP/chevrolet/Corvette/2023/Content-1.jpg")',
    'Proyectos': 'url("https://di-sitebuilder-assets.s3.amazonaws.com/GMimages/gmMLP/chevrolet/Corvette/2023/Content-1.jpg")',
    'Anuncios': 'url("../assets/images/anuncios-background.jpg")',
    'Blog': 'url("../assets/img/blog-background.jpeg")',
    'Contactanos': 'url("../assets/images/contactanos-background.jpg")',
    'Involúcrate': 'url("../assets/images/involucrate-background.jpg")'
  };

  changeBackground(link: string): void {
    this.selectedLink = link;
  }

  goToProjects() {
    this.router.navigate(['user/projects']);
  }

  goToAnalytics(){
    this.router.navigate(['manager/dashboard']);
  }
  goToBlogs(){
    this.router.navigate(['user/blogs']);
  }

  goToLogin() {
    this.router.navigate(['../login']);
  }

  isLogged() {

    if (sessionStorage.getItem('token-session')) {
      this.logueado = true;
    } else {
      this.logueado = false;
    }
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['/']);
    window.location.reload();
  }

  decodeToken(token: string): any {

    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(
      function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }
    ).join(''));

    return JSON.parse(jsonPayload);
  }
}
