import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaComponent } from './nosotros/pagina/pagina.component';

const routes: Routes = [
 
  {
    path: 'nosotros',
    component: PaginaComponent,
    

    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NosotrosRoutingModule { }
