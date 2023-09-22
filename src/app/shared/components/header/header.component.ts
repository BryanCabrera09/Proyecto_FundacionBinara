import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userItems } from 'src/app/core/models/dummy-data';
import { Usuario } from 'src/app/core/models/usuario';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoadScriptService } from 'src/app/core/services/load-script.service';

/* Decode Jwt */
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isMenuOpen: boolean = false;
  userOverlayMenu: HTMLElement | null = null;

  selectedLink: string = '';
  logueado: boolean = false;
  openDialog: boolean = false;

  @ViewChild('form') form: any;
  usuario = new Usuario();
  formLogIn!: FormGroup;

  bodyAuthGoogle: any = {};

  userItems = userItems;

  constructor(private router: Router, private loadScriptService: LoadScriptService, private fb: FormBuilder,
    private authService: AuthService) {

    /* Damos el nombre del Script que queremos cargar */
    loadScriptService.loadScript(['menu-toggle']);
    loadScriptService.loadScript(['login-google']);
  }

  ngOnInit() {

    this.formLogIn = this.startForm();

    let token = sessionStorage.getItem('token-session') as string;
    this.bodyAuthGoogle = this.decodeToken(token);
    console.log(this.bodyAuthGoogle);

    this.isLogged();
  }

  backgroundImages: { [key: string]: string } = {
    '': 'url("assets/img/portada_binara.png")',
    'Home': 'url("assets/img/portada_binara.png")',
    'Nosotros': 'url("https://di-sitebuilder-assets.s3.amazonaws.com/GMimages/gmMLP/chevrolet/Corvette/2023/Content-1.jpg")',
    'Proyectos': 'url("https://di-sitebuilder-assets.s3.amazonaws.com/GMimages/gmMLP/chevrolet/Corvette/2023/Content-1.jpg")',
    'Anuncios': 'url("../assets/images/anuncios-background.jpg")',
    'Blog': 'url("../assets/img/blog-background.jpeg")',
    'Contactanos': 'url("../assets/images/contactanos-background.jpg")',
    'Involúcrate': 'url("../assets/images/involucrate-background.jpg")'
  };

  changeBackground(link: string): void {
    this.selectedLink = link;
  }

  goToProjects() {
    this.router.navigate(['user/projects']);
  }

  goToAnalytics() {
    this.router.navigate(['manager/dashboard']);
  }
  goToBlogs() {
    this.router.navigate(['user/blogs']);
  }

  showDialog() {
    this.openDialog = true;
  }

  isLogged() {

    if (sessionStorage.getItem('token-session')) {
      this.logueado = true;
    } else {
      this.logueado = false;
    }
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['/']);
    window.location.reload();
  }

  decodeToken(token: string): any {

    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(
      function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }
    ).join(''));

    return JSON.parse(jsonPayload);
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
      this.authService.login(this.formLogIn.get('username')?.value, this.formLogIn.get('password')?.value).subscribe(
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
