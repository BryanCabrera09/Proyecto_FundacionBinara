import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerProyectoComponent } from './pages/ver-proyecto/ver-proyecto.component';

const routes: Routes = [
  {
    path: 'proyecto/:id',
    component: VerProyectoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerProyectoRoutingModule { }

