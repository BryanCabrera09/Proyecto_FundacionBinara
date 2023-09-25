import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userItems } from 'src/app/core/models/dummy-data';
import { Usuario } from 'src/app/core/models/usuario';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoadScriptService } from 'src/app/core/services/load-script.service';

/* Decode Jwt */
import jwt_decode from 'jwt-decode';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { StorageService } from 'src/app/core/services/storage.service';

interface ResponseBody {
  token: string;
  // Otras propiedades si las hay
}

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
  formSignUp!: FormGroup;

  bodyAuthGoogle: any = {};

  userItems = userItems;

  constructor(private router: Router, private loadScriptService: LoadScriptService, private fbLog: FormBuilder, private fbSign: FormBuilder,
    private authService: AuthService, private userService: UsuarioService, private storageServ: StorageService) {

    /* Damos el nombre del Script que queremos cargar */
    loadScriptService.loadScript(['menu-toggle']);
    loadScriptService.loadScript(['login-google']);
  }

  ngOnInit() {

    this.formLogIn = this.startForm();
    this.formSignUp = this.startFormSignUp();

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
    return this.fbLog.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  startFormSignUp(): FormGroup {
    return this.fbSign.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        ],
      ],
    });
  }

  isInvalidForm(controlName: string): boolean {
    const control = this.formLogIn.get(controlName);
    return !!control && control.invalid && control.touched;
  }

  isInvalidFormS(controlName: string): boolean {
    const control = this.formSignUp.get(controlName);
    return !!control && control.invalid && control.touched;
  }

  markAllFieldsAsTouched() {
    Object.values(this.formLogIn.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  markAllFieldsAsTouchedS() {
    Object.values(this.formSignUp.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  logIn() {
    this.markAllFieldsAsTouched();
    if (this.formLogIn.valid) {
      this.authService.login(this.formLogIn.get('username')?.value, this.formLogIn.get('password')?.value).subscribe(
        (response) => {
          this.formLogIn.reset();
          console.log(response)
          const body: any = response.body;
          if (body && typeof body === 'object' && 'token' in body) {
            const xTokenBody = body.token;
            window.sessionStorage.setItem("X-Token", body.token); // to save the JWT in the sessionStorage
            const decodedToken: any = jwt_decode(xTokenBody);
            const userLoged = decodedToken.usuario;
            let usr: Usuario = userLoged;
            usr.authStatus = "AUTH"
            window.sessionStorage.setItem("userdetails",JSON.stringify(usr));
            console.log(window.sessionStorage.getItem("userdetails"))
            switch (userLoged.rol) {
              case "ADMIN_ROLE":
                this.router.navigate(['user/projects']);
                break;
              case "USER_ROLE":
                this.goToBlogs();
                break; 
              default:
            }
            
          }
        }
      );
    }
  }

  guardarUsuario() {
    this.markAllFieldsAsTouchedS();
    if (this.formSignUp.valid) {
      this.usuario = new Usuario();
      this.usuario.nombre = this.formSignUp.get('nombre')?.value + " " + this.formSignUp.get('apellido')?.value;;
      this.usuario.correo = this.formSignUp.get('correo')?.value;
      this.usuario.password = this.formSignUp.get('password')?.value;
      this.usuario.rol = "USER_ROLE"
      this.userService.createUser(this.usuario).subscribe(
        (res) => {
          this.formSignUp.reset();
          console.log(res)
        },
        (error) => {
          let status = error.status
          switch (status) {
            case 400:
              console.log("Usuario exixstente")
              break
            default:
              console.log("ERROR DEL SERVIDOR")
          }
        }
      )
      console.log(this.usuario);
    } else {
      console.log(this.formSignUp.errors);
    }
  }
}
