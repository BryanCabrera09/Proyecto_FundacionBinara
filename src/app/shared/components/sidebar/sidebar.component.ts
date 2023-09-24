import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/core/models/usuario';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  menuItems?: any[];
  menuPermitido = [{
    titulo: "Dashboard",
    icono: "nav-icon fas fa-tachometer-alt",
    submenu: [
      { titulo: "Authorities", url: "profesor", icono: 'far fa-user' },
      { titulo: "Credential", url: "materia", icono: 'fa fa-book' },
      { titulo: "Google", url: "matricula", icono: 'far fa-file-alt' },
      { titulo: "Azure", url: "curso", icono: 'fas fa-building' }
    ]
  }]


  //creacion de objeto de la clase persona;
  userC: Usuario = new Usuario();

  //variables don de voy recibir el storage para el login
  id_user?: any;
  nombreUser?: any;

  isUserAdmin: boolean = false;
  isUserProf: boolean = false;
  isUserEstud: boolean = false;

  rolUser: any;

  cedula: any;
  nombre: any;


  constructor(private router: Router, private storage: StorageService) {
  }



  ngOnInit(): void {

  }

  public getUser() {
    // this.id_user = localStorage.getItem('id_cliente');
    this.rolUser = localStorage.getItem('rol');
    if (this.rolUser != null) {
      switch (this.rolUser) {
        case 'ADMIN':
          this.isUserAdmin = true;
          this.isUserProf = false;
          this.isUserEstud = false;
          this.menuPermitido = [{
            titulo: "Dashboard",
            icono: "nav-icon fas fa-tachometer-alt",
            submenu: [
              { titulo: "Profesores", url: "profesor", icono: 'far fa-user' },
              { titulo: "Materias", url: "materia", icono: 'fa fa-book' },
              { titulo: "Matrículas", url: "matricula", icono: 'far fa-file-alt' },
              { titulo: "Cursos", url: "curso", icono: 'fas fa-building' },
              { titulo: "Estudiantes", url: "estudiante", icono: 'fas fa-graduation-cap' },
              { titulo: "Periodo", url: "periodo", icono: 'far fa-calendar-alt' }
            ]
          }]
          break;
        case 'ESTUDIANTE':
          this.isUserAdmin = false;
          this.isUserProf = false;
          this.isUserEstud = true;
          this.menuPermitido = [{
            titulo: "Dashboard",
            icono: "nav-icon fas fa-tachometer-alt",
            submenu: [
              { titulo: "Notas", url: "notas-estudiante", icono: 'far fa-sticky-note' }

            ]
          }]
          break;
        case 'PROFESOR':
          this.isUserAdmin = false;
          this.isUserProf = true;
          this.isUserEstud = false;
          this.menuPermitido = [{
            titulo: "Dashboard",
            icono: "nav-icon fas fa-tachometer-alt",
            submenu: [
              { titulo: "Estudiantes", url: "estudiante", icono: 'fas fa-graduation-cap' },
              { titulo: "Calificaciones", url: "calificacion", icono: 'fas fa-graduation-cap' },
              { titulo: "Notas", url: "notas-estudiante", icono: 'far fa-sticky-note' }
            ]
          }]
          break;
      }
    } else {
    }
  }

  public logOut(): void {
    window.localStorage.clear();
    window.sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }


}
