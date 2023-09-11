import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/core/models/usuario';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadScriptService } from 'src/app/core/services/load-script.service';
import { AuthGoogleService } from 'src/app/shared/services/auth-google.service';

declare var google: any;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, AfterViewInit {

  usuario = new Usuario();
  formLogIn!: FormGroup;

  constructor(private loginService: AuthService, private router: Router,
    private fb: FormBuilder, private loadScriptService: LoadScriptService, private authService: AuthGoogleService) {

    loadScriptService.loadScript(['login-google'])
  }

  ngAfterViewInit(): void {
    google.accounts.id.initialize({
      client_id: "713010332294-6d3e25kg62qlkha8lcqne687un71dt6l.apps.googleusercontent.com",
      callback: this.handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large", }  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  }

  ngOnInit(): void {
    console.log("se encuentra2");
    console.log(this.router);
    this.formLogIn = this.createformLogIn();
  }

  handleCredentialResponse(response: any) {
    console.log(response);
    console.log(this.router);
    if (response.credential) {
      sessionStorage.setItem("token", response.credential);
      document.location.href = "/sesion/principal";
    }
  }

  private createformLogIn(): FormGroup {
    return this.fb.group({
      usuario: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  public logIn() {
    if (this.formLogIn.invalid) {
      Object.values(this.formLogIn.controls).forEach(control => {
        control.markAllAsTouched();
      });
      return;
    }

    if (!this.authService.ingresarAplicativo(this.formLogIn.value)) {
      alert("Usuario o contraseña invalido");
    } else {
      this.router.navigateByUrl("/sesion/principal");
    }
  }

  public get f(): any {
    return this.formLogIn.controls;
  }

  isInvalidForm(controlName: string): boolean {
    const control = this.formLogIn.get(controlName);
    return !!control && control.invalid && control.touched;
  }

}
