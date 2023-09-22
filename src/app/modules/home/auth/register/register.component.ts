import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/core/models/usuario';
import { UsuarioService } from 'src/app/core/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user!: Usuario;
  formSignUp!: FormGroup;

  constructor(private fb: FormBuilder, private userServ: UsuarioService) { }

  ngOnInit(): void {
    this.formSignUp = this.startForm();
  }

  startForm(): FormGroup {
    return this.fb.group({
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
    const control = this.formSignUp.get(controlName);
    return !!control && control.invalid && control.touched;
  }

  markAllFieldsAsTouched() {
    Object.values(this.formSignUp.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  guardarUsuario() {
    this.markAllFieldsAsTouched();
    if (this.formSignUp.valid) {
      this.user = new Usuario();
      this.user.nombre = this.formSignUp.get('nombre')?.value + " " + this.formSignUp.get('apellido')?.value;;
      this.user.correo = this.formSignUp.get('correo')?.value;
      this.user.password = this.formSignUp.get('password')?.value;
      this.user.rol = "USER_ROLE"
      this.userServ.createUser(this.user).subscribe(
        (res) => {
          console.log(res)
        },
        (error) => {
          let status = error.status
          switch(status) {
            case 400:
              console.log("Usuario exixstente")
              break
            default:
              console.log("ERROR DEL SERVIDOR")
          }
        }
      )
      console.log(this.user);
    } else {
      console.log(this.formSignUp.errors);
    }
  }

}
