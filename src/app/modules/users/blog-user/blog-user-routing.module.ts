import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogUserComponent } from './pages/blog-user/blog-user.component';

const routes: Routes = [
  {
    path: 'blog',
    component: BlogUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogUserRoutingModule { }
