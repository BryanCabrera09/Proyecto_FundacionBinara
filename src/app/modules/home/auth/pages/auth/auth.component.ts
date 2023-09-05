import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/core/models/usuario';
import { AuthService } from 'src/app/core/services/auth.service';
import { getCookie } from 'typescript-cookie';
import jwt_decode from 'jwt-decode';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  usuario = new Usuario();
  formLogIn!: FormGroup;

  constructor(private loginService: AuthService, private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formLogIn = this.startForm();
  }

  startForm(): FormGroup {
    return this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  isInvalidForm(controlName: string): boolean {
    const control = this.formLogIn.get(controlName);
    return !!control && control.invalid && control.touched;
  }
  
  markAllFieldsAsTouched() {
    Object.values(this.formLogIn.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  logIn() {
    
    this.markAllFieldsAsTouched();
  
    if (this.formLogIn.valid) {
      // Access the form values and set them in the usuario object
      this.usuario.correo = this.formLogIn.get('username')?.value;
      this.usuario.password = this.formLogIn.get('password')?.value;
      console.log(this.usuario)
  
      this.loginService.validateLoginDetails(this.usuario).subscribe(
        responseData => {
          const authorizationHeader = responseData.headers.get('x-token'); // to obtain JWT
          if (authorizationHeader) {
            window.sessionStorage.setItem('Authorization', authorizationHeader);
            const decodedToken: any = jwt_decode(authorizationHeader); // Decode the JWT
            const role = decodedToken.authorities; // Assuming the role is stored in the 'role' field of the JWT payload
            localStorage.setItem("roles", role)
            console.log(role)
          }
        });
    }
  }
  



}
