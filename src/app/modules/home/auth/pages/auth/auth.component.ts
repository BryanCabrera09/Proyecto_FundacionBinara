import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/core/models/usuario';
import { AuthService } from 'src/app/core/services/auth.service';
import { getCookie } from 'typescript-cookie';
import jwt_decode from 'jwt-decode';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadScriptService } from 'src/app/core/services/load-script.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  usuario = new Usuario();
  formLogIn!: FormGroup;

  constructor(private loginService: AuthService, private router: Router,
    private fb: FormBuilder, private loadScriptService: LoadScriptService) {

    loadScriptService.loadScript(['login-google'])
  }

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
      this.loginService.login(this.formLogIn.get('username')?.value, this.formLogIn.get('password')?.value).subscribe(
        (response) => {
          console.log(response);
          const xToken = response.headers.get('X-Token');
          console.log("JWT: " + xToken);
          if (xToken) {
            window.sessionStorage.setItem('Authorization', xToken);
            const decodedToken: any = jwt_decode(xToken); // Decode the JWT
            const role = decodedToken.authorities; // Assuming the role is stored in the 'authorities' field of the JWT payload
            localStorage.setItem("roles", role);
            console.log(role);
          }
        }
      );
    }
  }

}
