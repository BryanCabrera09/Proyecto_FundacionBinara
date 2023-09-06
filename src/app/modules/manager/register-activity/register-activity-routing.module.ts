import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterActivityComponent } from './pages/register-activity/register-activity.component';

const routes: Routes = [
  {
    path:'activity',
    component:RegisterActivityComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterActivityRoutingModule { }
