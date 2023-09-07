import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { RegisterProjectRoutingModule } from './register-project-routing.module';
import { RegisterProjectComponent } from './pages/register-project/register-project.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    RegisterProjectComponent
  ],
  imports: [
    MatSnackBarModule,
    CommonModule,
    FormsModule,
    RegisterProjectRoutingModule
  ]
})
export class RegisterProjectModule { }
