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
    loadChildren: () => import('./blogs/blogs.module').then(m => m.BlogsModule)
  },
  {
    path: '',
    loadChildren: () => import('./ver-blogs/ver-blogs.module').then(m => m.VerBlogsModule)
  },
  {
    path: '',
    loadChildren: () => import('./contact-us/contact-us.module').then(m => m.ContactUsModule)
  },
  {
    path: '',
    loadChildren: () => import('./nosotros/nosotros.module').then(m => m.NosotrosModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
