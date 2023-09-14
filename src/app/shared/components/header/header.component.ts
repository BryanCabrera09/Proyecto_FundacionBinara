import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadScriptService } from 'src/app/core/services/load-script.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isMenuOpen: boolean = false;
  selectedLink: string = '';

  constructor(private router: Router, private loadScriptService: LoadScriptService) {

    /* Damos el nombre del Script que queremos cargar */
    loadScriptService.loadScript(['menu-toggle'])
  }

  ngOnInit() { }

  backgroundImages: { [key: string]: string } = {
    '': 'url("assets/img/portada_binara.png")',
    'Home': 'url("assets/img/portada_binara.png")',
    'Nosotros': 'url("https://di-sitebuilder-assets.s3.amazonaws.com/GMimages/gmMLP/chevrolet/Corvette/2023/Content-1.jpg")',
    'Proyectos': 'url("https://di-sitebuilder-assets.s3.amazonaws.com/GMimages/gmMLP/chevrolet/Corvette/2023/Content-1.jpg")',
    'Anuncios': 'url("../assets/images/anuncios-background.jpg")',
    'Blog': 'url("../assets/images/blog-background.jpg")',
    'Contactanos': 'url("../assets/images/contactanos-background.jpg")',
    'Involúcrate': 'url("../assets/images/involucrate-background.jpg")'
  };

  changeBackground(link: string): void {
    this.selectedLink = link;
  }

  goToProjects() {
    this.router.navigate(['user/projects']);
  }

  goToAnalytics() {
    this.router.navigate(['manager/dashboard'])
  }

  goToLogin() {
    this.router.navigate(['../login']);
  }

}
