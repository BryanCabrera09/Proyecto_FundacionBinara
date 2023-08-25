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

  constructor(private router: Router, private projectService: ProyectosService) { }

  ngOnInit() {
  }

  listProjects() {
    this.projectService.getActiveProjects().subscribe(data => {
      this.projects = data;
    });
  }

  goToArticle(e: any) {
    this.router.navigate(['usuario/ver/proyecto']);
  }


}
