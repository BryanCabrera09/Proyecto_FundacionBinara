import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { VerBlogsComponent } from './pages/ver-blogs/ver-blogs.component';

const routes: Routes = [
  {
    path: 'ver-blogs/:id',
    component: VerBlogsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), 
    MatDialogModule],
  exports: [RouterModule]
})
export class VerBlogsRoutingModule { }
