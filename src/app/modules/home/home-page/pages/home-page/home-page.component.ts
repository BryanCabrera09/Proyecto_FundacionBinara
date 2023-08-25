import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proyectos } from 'src/app/core/models/proyectos';
import { ProyectosService } from 'src/app/core/services/proyectos.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  projects?: Proyectos[];

  sliderImages: string[] = ["s1.jpg", "s2.jpg", "s3.jpg", "s4.jpg"];
  currentIndex: number = 0;

  selectedLink: string = 'url(assets/img/portada_binara.png)';

  constructor(private router: Router, private projectService: ProyectosService) { }

  ngOnInit() {
    this.startSlider();
  }

  listProjects() {
    this.projectService.getActiveProjects().subscribe(data => {
      this.projects = data;
    });
  }

  goToArticle(e: any) {
    this.router.navigate(['usuario/ver/proyecto']);
  }

  changeImage() {
    const background = document.querySelector('.background') as HTMLElement;
    background.style.backgroundImage = `url('assets/slider/${this.sliderImages[this.currentIndex]}')`;
    this.currentIndex = (this.currentIndex + 1) % this.sliderImages.length;
  }

  startSlider() {
    setInterval(() => {
      this.changeImage();
    }, 2000); 
  }

}
