import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isMenuOpen: boolean = false;
  selectedLink: string = '';

  constructor(private router: Router) { }

  ngOnInit() { }

  backgroundImages: { [key: string]: string } = {
    '': 'url("assets/img/portada_binara.png")',
    'Home': 'url("assets/img/portada_binara.png")',
    'Nosotros': 'url("https://di-sitebuilder-assets.s3.amazonaws.com/GMimages/gmMLP/chevrolet/Corvette/2023/Content-1.jpg")',
    'Proyectos': 'url("https://di-sitebuilder-assets.s3.amazonaws.com/GMimages/gmMLP/chevrolet/Corvette/2023/Content-1.jpg")',
    'Anuncios': 'url("../assets/images/anuncios-background.jpg")',
    'Blog': 'url("../assets/img/blog-background.jpg")',
    'Contactanos': 'url("../assets/images/contactanos-background.jpg")',
    'Involúcrate': 'url("../assets/images/involucrate-background.jpg")'
  };

  changeBackground(link: string): void {
    this.selectedLink = link;
  }

  toggleMenu() {
    const toggleBtn = document.querySelector('.toggle_btn');
    const toggleBtnIcon = document.querySelector('.toggle_btn i');
    const dropDownMenu = document.querySelector('.dropdown_menu');

    toggleBtn?.addEventListener('click', () => {
      dropDownMenu?.classList.toggle('open');

      const isOpen = dropDownMenu?.classList.contains('open');

      if (toggleBtnIcon) {
        if (isOpen) {
          toggleBtnIcon.classList.remove('bx-menu');
          toggleBtnIcon.classList.add('bx-x');
        } else {
          toggleBtnIcon.classList.remove('bx-x');
          toggleBtnIcon.classList.add('bx-menu');
        }
      }
    });
  }

  goToProjects() {
    this.router.navigate(['user/projects']);
  }
  goToEstadisticas(){
    this.router.navigate(['manager/dashboard']);
  }
  goToBlog(){
    this.router.navigate(['user/blog']);
  }
}
