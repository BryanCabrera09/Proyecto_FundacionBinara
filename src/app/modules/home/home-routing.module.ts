import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/pages/home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
