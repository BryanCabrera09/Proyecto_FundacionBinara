import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./proyectos/proyectos.module').then(m => m.ProyectosModule)
  },
  {
    path: 'ver',
    loadChildren: () => import('./ver-proyecto/ver-proyecto.module').then(m => m.VerProyectoModule)
  },
  {
    path: '',
    loadChildren: () => import('./blog-user/blog-user.module').then(m => m.BlogUserModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
