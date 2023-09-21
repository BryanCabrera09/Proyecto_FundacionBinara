import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'blogs',
    component: BlogsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule],
  exports: [RouterModule]
})
export class BlogsRoutingModule { }