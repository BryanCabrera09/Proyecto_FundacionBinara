import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterProjectComponent } from 'src/app/modules/manager/register-project/pages/register-project/register-project.component';
import { Router } from '@angular/router';
import { Proyectos } from 'src/app/core/models/proyectos';
import { ProyectosService } from 'src/app/core/services/proyectos.service';
import baserUrl from "src/app/core/helpers/helperUrl";

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss']
})

export class ProyectosComponent implements OnInit {

  projects?: Proyectos[];
baseUrl: string= baserUrl;
  roluser: string= window.localStorage.getItem("roles") ?? "sin rol";

  constructor(private dialog: MatDialog, private router: Router, private projectService: ProyectosService) { }

  ngOnInit() {
    if(this.roluser=="ADMIN_ROLE"){
      this.geProjectsList();
      console.log("adminnnnnnnnnnnnnnnn")
   
    }else{
      this.getActiveProjectsList();
      console.log("useer")
    }


  }

  getActiveProjectsList(): void {
    this.projectService.getActiveProjects().subscribe(
      proyectos => {
        this.projects = proyectos;
      },
      error => {
        console.error('Error obteniendo proyectos:', error);
      }
    );
  }
  geProjectsList(): void {
    this.projectService.getProjects().subscribe(
      proyectos => {
        this.projects = proyectos;
      },
      error => {
        console.error('Error obteniendo proyectos:', error);
      }
    );
  }

  listProjects() {
    console.log("this.projects")
    this.projectService.getProjects().subscribe(data => {
      this.projects = data;

    });
  }


  abrirSheet() {
    this.dialog.open(RegisterProjectComponent, {
      width: '800px',
      hasBackdrop: false,
      height: '600px',
      data: { proyecto: null, editing:false } 
    });
  }

  getProvincia(lugar: any): string {
    return lugar.split(';')[0];
  }

  confirmMessage: string = '';
  isConfirmVisible: boolean = false;
  projectToDelete: Proyectos | null = null;
  
  confirmDeleteProject(project: Proyectos): void {
    if (project.visible) {
        this.confirmMessage = `¿Estás seguro de que deseas DESACTIVAR el proyecto "${project.titulo}"?`;
    } else {
        this.confirmMessage = `¿Estás seguro de que deseas ACTIVAR el proyecto "${project.titulo}"?`;
    }
    this.projectToDelete = project;
    this.isConfirmVisible = true;
  }

  confirm(): void {
    if (this.projectToDelete) {
      if (this.projectToDelete.visible) {
        this.desactivarProject(this.projectToDelete);
      } else {
        this.activarProject(this.projectToDelete);
      }
    }
    this.isConfirmVisible = false;
    this.projectToDelete = null;
  }


  cancel(): void {
    this.isConfirmVisible = false;
    this.projectToDelete = null;
  }


  desactivarProject(project: Proyectos): void {
    this.projectService.deleteProject(project.uid!).subscribe(
      response => {
        console.log('Proyecto Desactivado con éxito', response);
        this.getActiveProjectsList();
      },
      error => {
        console.error('Error al eliminar el proyecto', error);
      }
    );
  }

  activarProject(project: Proyectos): void {
    this.projectService.activarProyecto(project.uid!).subscribe(
      response => {
        console.log('Proyecto Activado con éxito', response);
        this.getActiveProjectsList();
      },
      error => {
        console.error('Error al eliminar el proyecto', error);
      }
    );
  }
  

  editarproyecto(project: Proyectos) {
    this.dialog.open(RegisterProjectComponent, {
      width: '800px',
      hasBackdrop: false,
      height: '600px',
      data: { proyecto: project, editing:true }  
    });
  }
  
  goToArticle(projectId: any) {
    if (projectId !== undefined) {
      this.router.navigate(['user/ver/proyecto', projectId]);
    } else {
      console.log(projectId);
    }
  }
}

